import {
	FacetProp,
	CascadedTypeOfFacetProp,
	TypeOfFacetProp,
	NullableTypeOfFacetProp,
} from './prop';
import { FacetPropType, TypeOfPropType } from './propType';
import { FacetDefinition, FacetInstanceType } from './facet';
import { FacetCascadeNotImplError } from './errors';
import { mapFacet } from './map';

export type WithScope<T> = {
	scope:
		| {
				kind: 'community' | 'collection' | 'pub';
				id: string;
		  }
		| { root: true };
	value: T;
};

type FacetPropCascadeDirection = 'asc' | 'desc';

type AvailableCascadeStrategyForPropType<PropType extends FacetPropType> =
	// Any prop type can use the `overwrite` strategy
	| 'overwrite'
	// Only props that are objects can object-merge during cascade" {...a, ...b}
	| (TypeOfPropType<PropType> extends Record<string, any> ? 'merge' : never)
	// Only props that are arrays can array-merge during cascasde: [...a, ...b]
	| (TypeOfPropType<PropType> extends any[] ? 'extend' : never);

export type FacetPropCascade<PropType extends FacetPropType> = {
	strategy: AvailableCascadeStrategyForPropType<PropType>;
	direction: FacetPropCascadeDirection;
};

type PropCascadeContribution<Prop extends FacetProp> = {
	overwrite: NullableTypeOfFacetProp<Prop>;
	extend: TypeOfFacetProp<Prop>; // This is a (possibly empty) array
	merge: Partial<TypeOfFacetProp<Prop>>;
}[Prop['cascade']['strategy']];

type PropCascadeResult<Prop extends FacetProp> = {
	overwrite: CascadedTypeOfFacetProp<Prop>;
	extend: TypeOfFacetProp<Prop>; // This is a (possibly empty) array
	merge: Partial<TypeOfFacetProp<Prop>>;
}[Prop['cascade']['strategy']];

export type FacetPropCascadeResult<Prop extends FacetProp> = {
	result: PropCascadeResult<Prop>;
	contributions: WithScope<PropCascadeContribution<Prop>>[];
};

export type FacetCascadedType<Def extends FacetDefinition> = {
	[K in keyof Def['props']]: PropCascadeResult<Def['props'][K]>;
};

export type FacetCascadeResult<Def extends FacetDefinition> = {
	result: FacetCascadedType<Def>;
	props: { [K in keyof Def['props']]: FacetPropCascadeResult<Def['props'][K]> };
};

function cascadeProp<Prop extends FacetProp>(
	prop: Prop,
	sources: WithScope<NullableTypeOfFacetProp<Prop>>[],
): FacetPropCascadeResult<Prop> {
	const {
		cascade: { strategy, direction },
	} = prop;
	if (direction === 'asc') {
		sources = sources.concat().reverse();
	}
	if (strategy === 'overwrite') {
		type PropWithCascade = Prop & { cascade: { strategy: 'overwrite' } };
		const contributions: WithScope<PropCascadeContribution<PropWithCascade>>[] = sources;
		const result: PropCascadeResult<PropWithCascade> = sources
			.map((s) => s.value)
			.reduce((a, b) => b ?? a, null);
		return { contributions, result };
	}
	if (strategy === 'extend') {
		type PropWithCascade = Prop & { cascade: { strategy: 'extend' } };
		const contributions: WithScope<PropCascadeContribution<PropWithCascade>>[] = sources;
		const result: PropCascadeResult<PropWithCascade> = sources
			.map((s) => (s.value || []) as any[])
			.reduce((a, b) => [...a, ...b], []);
		return { contributions, result };
	}
	throw new FacetCascadeNotImplError(strategy);
}

export function cascade<Def extends FacetDefinition>(
	def: Def,
	instances: WithScope<FacetInstanceType<Def>>[],
): FacetCascadeResult<Def> {
	const props = mapFacet(def, (key, prop) => {
		const propInstances = instances.map((instance) => {
			const { scope, value } = instance;
			return { scope, value: value[key] };
		});
		return cascadeProp(prop, [
			{ scope: { root: true as const }, value: prop.rootValue },
			...propInstances,
		]);
	}) as FacetCascadeResult<Def>['props'];
	const result = mapFacet(def, (key) => {
		return props[key].result;
	}) as FacetCascadedType<Def>;
	return { props, result };
}
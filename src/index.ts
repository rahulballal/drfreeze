// ============================================
// Type Definition (Improved Readability)
// ============================================

/**
 * Primitive types that don't need deep freezing
 */
type Primitive = 
  | string 
  | number 
  | boolean 
  | bigint 
  | symbol 
  | null 
  | undefined 
  | Function;

/**
 * Makes an object deeply readonly while remaining assignable to its mutable version.
 * 
 * @example
 * const frozen: FrozenObject<User> = { name: "Alice" };
 * frozen.name = "Bob"; // ❌ Error: readonly
 * updateUser(frozen);  // ✅ Works: assignable to User
 */
export type FrozenObject<T> = 
  // If it's a primitive, leave it unchanged
  T extends Primitive
    ? T
  // If it's an array, make it ReadonlyArray with frozen elements
  : T extends Array<infer Element>
    ? ReadonlyArray<FrozenObject<Element>>
  // If it's a Map, make it ReadonlyMap with frozen values
  : T extends Map<infer Key, infer Value>
    ? ReadonlyMap<Key, FrozenObject<Value>>
  // If it's a Set, make it ReadonlySet with frozen elements
  : T extends Set<infer Element>
    ? ReadonlySet<FrozenObject<Element>>
  // Otherwise it's an object - make all properties readonly and recurse
  : {
      readonly [Property in keyof T]: FrozenObject<T[Property]>;
    };

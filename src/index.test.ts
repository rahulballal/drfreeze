
import { expectType, expectError, expectAssignable } from 'expect-type';

// ============================================
// Test Setup
// ============================================

interface User {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
    nested: {
      value: number;
    };
  };
  hobbies: string[];
  metadata?: {
    created: Date;
  };
}


describe('FrozenObject Type Tests with expect-type', () => {
  const frozenUser: FrozenObject<User> = {
    name: "Alice",
    age: 30,
    address: {
      street: "123 Main St",
      city: "NYC",
      nested: { value: 42 }
    },
    hobbies: ["reading", "coding"],
    metadata: { created: new Date() }
  };

  // Test 1: Deep readonly - top level property assignment should error
  test('cannot reassign top-level properties', () => {
    expectError(() => {
      frozenUser.name = "Bob";
    });
    
    expectError(() => {
      frozenUser.age = 31;
    });
  });

  // Test 2: Deep readonly - nested property assignment should error
  test('cannot reassign nested properties', () => {
    expectError(() => {
      frozenUser.address.city = "LA";
    });
    
    expectError(() => {
      frozenUser.address.nested.value = 100;
    });
  });

  // Test 3: Deep readonly - array mutations should error
  test('cannot mutate arrays', () => {
    expectError(() => {
      frozenUser.hobbies.push("gaming");
    });
    
    expectError(() => {
      frozenUser.hobbies[0] = "swimming";
    });
  });

  // Test 4: FrozenObject<T> is assignable to T
  test('FrozenObject<User> is assignable to User', () => {
    expectAssignable<User>(frozenUser);
  });

  // Test 5: Can pass to functions expecting mutable T
  test('can pass to functions expecting mutable type', () => {
    function updateUser(user: User): void {
      user.name = "Updated";
      user.address.city = "Boston";
      user.hobbies.push("gaming");
    }

    // This should not cause a compile error
    expectType<(user: User) => void>(updateUser);
    updateUser(frozenUser); // Should compile without error
  });

  // Test 6: Primitives remain unchanged
  test('primitives are preserved', () => {
    type FrozenString = FrozenObject<string>;
    type FrozenNumber = FrozenObject<number>;
    
    expectType<string>({} as FrozenString);
    expectType<number>({} as FrozenNumber);
  });

  // Test 7: Arrays become ReadonlyArray
  test('arrays become readonly', () => {
    type FrozenArray = FrozenObject<string[]>;
    expectAssignable<ReadonlyArray<string>>({} as FrozenArray);
  });

  // Test 8: Optional properties remain optional
  test('optional properties are preserved', () => {
    const partial: FrozenObject<User> = {
      name: "Alice",
      age: 30,
      address: {
        street: "123 Main St",
        city: "NYC",
        nested: { value: 42 }
      },
      hobbies: []
      // metadata is optional, can be omitted
    };
    
    expectAssignable<FrozenObject<User>>(partial);
  });

  // Test 9: All three versions are equivalent
  test('all type versions produce the same result', () => {
    expectType<Version1>({} as Version2);
    expectType<Version2>({} as Version3);
    expectType<Version3>({} as Version1);
  });
});


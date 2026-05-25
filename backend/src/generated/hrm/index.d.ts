
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model company
 * 
 */
export type company = $Result.DefaultSelection<Prisma.$companyPayload>
/**
 * Model karyawan
 * 
 */
export type karyawan = $Result.DefaultSelection<Prisma.$karyawanPayload>
/**
 * Model mstdept
 * 
 */
export type mstdept = $Result.DefaultSelection<Prisma.$mstdeptPayload>
/**
 * Model mstjab
 * 
 */
export type mstjab = $Result.DefaultSelection<Prisma.$mstjabPayload>
/**
 * Model mstbag
 * 
 */
export type mstbag = $Result.DefaultSelection<Prisma.$mstbagPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
  EMPLOYEE: 'EMPLOYEE'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const StatusAktif: {
  AKTIF: 'AKTIF',
  TIDAK_AKTIF: 'TIDAK_AKTIF',
  SUSPENDED: 'SUSPENDED'
};

export type StatusAktif = (typeof StatusAktif)[keyof typeof StatusAktif]


export const StatusKaryawan: {
  TETAP: 'TETAP',
  KONTRAK: 'KONTRAK',
  OUTSOURCING: 'OUTSOURCING',
  MAGANG: 'MAGANG',
  PROBATION: 'PROBATION'
};

export type StatusKaryawan = (typeof StatusKaryawan)[keyof typeof StatusKaryawan]


export const JenisKelamin: {
  LAKILAKI: 'LAKILAKI',
  PEREMPUAN: 'PEREMPUAN'
};

export type JenisKelamin = (typeof JenisKelamin)[keyof typeof JenisKelamin]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type StatusAktif = $Enums.StatusAktif

export const StatusAktif: typeof $Enums.StatusAktif

export type StatusKaryawan = $Enums.StatusKaryawan

export const StatusKaryawan: typeof $Enums.StatusKaryawan

export type JenisKelamin = $Enums.JenisKelamin

export const JenisKelamin: typeof $Enums.JenisKelamin

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Accounts
 * const accounts = await prisma.account.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.company`: Exposes CRUD operations for the **company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.companyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.karyawan`: Exposes CRUD operations for the **karyawan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Karyawans
    * const karyawans = await prisma.karyawan.findMany()
    * ```
    */
  get karyawan(): Prisma.karyawanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mstdept`: Exposes CRUD operations for the **mstdept** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mstdepts
    * const mstdepts = await prisma.mstdept.findMany()
    * ```
    */
  get mstdept(): Prisma.mstdeptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mstjab`: Exposes CRUD operations for the **mstjab** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mstjabs
    * const mstjabs = await prisma.mstjab.findMany()
    * ```
    */
  get mstjab(): Prisma.mstjabDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mstbag`: Exposes CRUD operations for the **mstbag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mstbags
    * const mstbags = await prisma.mstbag.findMany()
    * ```
    */
  get mstbag(): Prisma.mstbagDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Account: 'Account',
    User: 'User',
    Session: 'Session',
    company: 'company',
    karyawan: 'karyawan',
    mstdept: 'mstdept',
    mstjab: 'mstjab',
    mstbag: 'mstbag'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "account" | "user" | "session" | "company" | "karyawan" | "mstdept" | "mstjab" | "mstbag"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      company: {
        payload: Prisma.$companyPayload<ExtArgs>
        fields: Prisma.companyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.companyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.companyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companyPayload>
          }
          findFirst: {
            args: Prisma.companyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.companyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companyPayload>
          }
          findMany: {
            args: Prisma.companyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companyPayload>[]
          }
          create: {
            args: Prisma.companyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companyPayload>
          }
          createMany: {
            args: Prisma.companyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.companyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companyPayload>[]
          }
          delete: {
            args: Prisma.companyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companyPayload>
          }
          update: {
            args: Prisma.companyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companyPayload>
          }
          deleteMany: {
            args: Prisma.companyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.companyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.companyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companyPayload>[]
          }
          upsert: {
            args: Prisma.companyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.companyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.companyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      karyawan: {
        payload: Prisma.$karyawanPayload<ExtArgs>
        fields: Prisma.karyawanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.karyawanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$karyawanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.karyawanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$karyawanPayload>
          }
          findFirst: {
            args: Prisma.karyawanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$karyawanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.karyawanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$karyawanPayload>
          }
          findMany: {
            args: Prisma.karyawanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$karyawanPayload>[]
          }
          create: {
            args: Prisma.karyawanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$karyawanPayload>
          }
          createMany: {
            args: Prisma.karyawanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.karyawanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$karyawanPayload>[]
          }
          delete: {
            args: Prisma.karyawanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$karyawanPayload>
          }
          update: {
            args: Prisma.karyawanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$karyawanPayload>
          }
          deleteMany: {
            args: Prisma.karyawanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.karyawanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.karyawanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$karyawanPayload>[]
          }
          upsert: {
            args: Prisma.karyawanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$karyawanPayload>
          }
          aggregate: {
            args: Prisma.KaryawanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKaryawan>
          }
          groupBy: {
            args: Prisma.karyawanGroupByArgs<ExtArgs>
            result: $Utils.Optional<KaryawanGroupByOutputType>[]
          }
          count: {
            args: Prisma.karyawanCountArgs<ExtArgs>
            result: $Utils.Optional<KaryawanCountAggregateOutputType> | number
          }
        }
      }
      mstdept: {
        payload: Prisma.$mstdeptPayload<ExtArgs>
        fields: Prisma.mstdeptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.mstdeptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstdeptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.mstdeptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstdeptPayload>
          }
          findFirst: {
            args: Prisma.mstdeptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstdeptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.mstdeptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstdeptPayload>
          }
          findMany: {
            args: Prisma.mstdeptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstdeptPayload>[]
          }
          create: {
            args: Prisma.mstdeptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstdeptPayload>
          }
          createMany: {
            args: Prisma.mstdeptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.mstdeptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstdeptPayload>[]
          }
          delete: {
            args: Prisma.mstdeptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstdeptPayload>
          }
          update: {
            args: Prisma.mstdeptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstdeptPayload>
          }
          deleteMany: {
            args: Prisma.mstdeptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.mstdeptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.mstdeptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstdeptPayload>[]
          }
          upsert: {
            args: Prisma.mstdeptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstdeptPayload>
          }
          aggregate: {
            args: Prisma.MstdeptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMstdept>
          }
          groupBy: {
            args: Prisma.mstdeptGroupByArgs<ExtArgs>
            result: $Utils.Optional<MstdeptGroupByOutputType>[]
          }
          count: {
            args: Prisma.mstdeptCountArgs<ExtArgs>
            result: $Utils.Optional<MstdeptCountAggregateOutputType> | number
          }
        }
      }
      mstjab: {
        payload: Prisma.$mstjabPayload<ExtArgs>
        fields: Prisma.mstjabFieldRefs
        operations: {
          findUnique: {
            args: Prisma.mstjabFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstjabPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.mstjabFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstjabPayload>
          }
          findFirst: {
            args: Prisma.mstjabFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstjabPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.mstjabFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstjabPayload>
          }
          findMany: {
            args: Prisma.mstjabFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstjabPayload>[]
          }
          create: {
            args: Prisma.mstjabCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstjabPayload>
          }
          createMany: {
            args: Prisma.mstjabCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.mstjabCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstjabPayload>[]
          }
          delete: {
            args: Prisma.mstjabDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstjabPayload>
          }
          update: {
            args: Prisma.mstjabUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstjabPayload>
          }
          deleteMany: {
            args: Prisma.mstjabDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.mstjabUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.mstjabUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstjabPayload>[]
          }
          upsert: {
            args: Prisma.mstjabUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstjabPayload>
          }
          aggregate: {
            args: Prisma.MstjabAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMstjab>
          }
          groupBy: {
            args: Prisma.mstjabGroupByArgs<ExtArgs>
            result: $Utils.Optional<MstjabGroupByOutputType>[]
          }
          count: {
            args: Prisma.mstjabCountArgs<ExtArgs>
            result: $Utils.Optional<MstjabCountAggregateOutputType> | number
          }
        }
      }
      mstbag: {
        payload: Prisma.$mstbagPayload<ExtArgs>
        fields: Prisma.mstbagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.mstbagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstbagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.mstbagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstbagPayload>
          }
          findFirst: {
            args: Prisma.mstbagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstbagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.mstbagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstbagPayload>
          }
          findMany: {
            args: Prisma.mstbagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstbagPayload>[]
          }
          create: {
            args: Prisma.mstbagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstbagPayload>
          }
          createMany: {
            args: Prisma.mstbagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.mstbagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstbagPayload>[]
          }
          delete: {
            args: Prisma.mstbagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstbagPayload>
          }
          update: {
            args: Prisma.mstbagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstbagPayload>
          }
          deleteMany: {
            args: Prisma.mstbagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.mstbagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.mstbagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstbagPayload>[]
          }
          upsert: {
            args: Prisma.mstbagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mstbagPayload>
          }
          aggregate: {
            args: Prisma.MstbagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMstbag>
          }
          groupBy: {
            args: Prisma.mstbagGroupByArgs<ExtArgs>
            result: $Utils.Optional<MstbagGroupByOutputType>[]
          }
          count: {
            args: Prisma.mstbagCountArgs<ExtArgs>
            result: $Utils.Optional<MstbagCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    account?: AccountOmit
    user?: UserOmit
    session?: SessionOmit
    company?: companyOmit
    karyawan?: karyawanOmit
    mstdept?: mstdeptOmit
    mstjab?: mstjabOmit
    mstbag?: mstbagOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    Account: number
    Session: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Account?: boolean | UserCountOutputTypeCountAccountArgs
    Session?: boolean | UserCountOutputTypeCountSessionArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    karyawan: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    karyawan?: boolean | CompanyCountOutputTypeCountKaryawanArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountKaryawanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: karyawanWhereInput
  }


  /**
   * Count Type MstdeptCountOutputType
   */

  export type MstdeptCountOutputType = {
    karyawan: number
  }

  export type MstdeptCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    karyawan?: boolean | MstdeptCountOutputTypeCountKaryawanArgs
  }

  // Custom InputTypes
  /**
   * MstdeptCountOutputType without action
   */
  export type MstdeptCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MstdeptCountOutputType
     */
    select?: MstdeptCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MstdeptCountOutputType without action
   */
  export type MstdeptCountOutputTypeCountKaryawanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: karyawanWhereInput
  }


  /**
   * Count Type MstjabCountOutputType
   */

  export type MstjabCountOutputType = {
    karyawan: number
  }

  export type MstjabCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    karyawan?: boolean | MstjabCountOutputTypeCountKaryawanArgs
  }

  // Custom InputTypes
  /**
   * MstjabCountOutputType without action
   */
  export type MstjabCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MstjabCountOutputType
     */
    select?: MstjabCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MstjabCountOutputType without action
   */
  export type MstjabCountOutputTypeCountKaryawanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: karyawanWhereInput
  }


  /**
   * Count Type MstbagCountOutputType
   */

  export type MstbagCountOutputType = {
    karyawan: number
  }

  export type MstbagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    karyawan?: boolean | MstbagCountOutputTypeCountKaryawanArgs
  }

  // Custom InputTypes
  /**
   * MstbagCountOutputType without action
   */
  export type MstbagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MstbagCountOutputType
     */
    select?: MstbagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MstbagCountOutputType without action
   */
  export type MstbagCountOutputTypeCountKaryawanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: karyawanWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: string | null
    providerAccountId: string | null
    access_token: string | null
    refresh_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: string | null
    providerAccountId: string | null
    access_token: string | null
    refresh_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    provider: number
    providerAccountId: number
    access_token: number
    refresh_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    type: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerAccountId?: true
    access_token?: true
    refresh_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerAccountId?: true
    access_token?: true
    refresh_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerAccountId?: true
    access_token?: true
    refresh_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    provider: string
    providerAccountId: string
    access_token: string | null
    refresh_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    type: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerAccountId?: boolean
    access_token?: boolean
    refresh_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerAccountId?: boolean
    access_token?: boolean
    refresh_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerAccountId?: boolean
    access_token?: boolean
    refresh_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerAccountId?: boolean
    access_token?: boolean
    refresh_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "provider" | "providerAccountId" | "access_token" | "refresh_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state" | "type" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      provider: string
      providerAccountId: string
      access_token: string | null
      refresh_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
      type: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    image: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
    fcmToken: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    image: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
    fcmToken: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    image: number
    role: number
    createdAt: number
    updatedAt: number
    isActive: number
    fcmToken: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    image?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    fcmToken?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    image?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    fcmToken?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    image?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    fcmToken?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string | null
    name: string | null
    image: string | null
    role: $Enums.UserRole
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    fcmToken: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    fcmToken?: boolean
    Account?: boolean | User$AccountArgs<ExtArgs>
    Session?: boolean | User$SessionArgs<ExtArgs>
    karyawan?: boolean | User$karyawanArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    fcmToken?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    fcmToken?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    fcmToken?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "image" | "role" | "createdAt" | "updatedAt" | "isActive" | "fcmToken", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Account?: boolean | User$AccountArgs<ExtArgs>
    Session?: boolean | User$SessionArgs<ExtArgs>
    karyawan?: boolean | User$karyawanArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      Account: Prisma.$AccountPayload<ExtArgs>[]
      Session: Prisma.$SessionPayload<ExtArgs>[]
      karyawan: Prisma.$karyawanPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string | null
      name: string | null
      image: string | null
      role: $Enums.UserRole
      createdAt: Date
      updatedAt: Date
      isActive: boolean
      fcmToken: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Account<T extends User$AccountArgs<ExtArgs> = {}>(args?: Subset<T, User$AccountArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Session<T extends User$SessionArgs<ExtArgs> = {}>(args?: Subset<T, User$SessionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    karyawan<T extends User$karyawanArgs<ExtArgs> = {}>(args?: Subset<T, User$karyawanArgs<ExtArgs>>): Prisma__karyawanClient<$Result.GetResult<Prisma.$karyawanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly fcmToken: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.Account
   */
  export type User$AccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.Session
   */
  export type User$SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.karyawan
   */
  export type User$karyawanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the karyawan
     */
    select?: karyawanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the karyawan
     */
    omit?: karyawanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: karyawanInclude<ExtArgs> | null
    where?: karyawanWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    sessionToken: string | null
    expires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    sessionToken: string | null
    expires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    sessionToken: number
    expires: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    sessionToken?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    sessionToken?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    sessionToken?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    sessionToken: string
    expires: Date
    createdAt: Date
    updatedAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sessionToken?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sessionToken?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sessionToken?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    sessionToken?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "sessionToken" | "expires" | "createdAt" | "updatedAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      sessionToken: string
      expires: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyMinAggregateOutputType = {
    id: string | null
    KODE_CMPY: string | null
    COMPANY: string | null
    ADDRESS1: string | null
    ADDRESS2: string | null
    ADDRESS3: string | null
    TLP: string | null
    FAX: string | null
    NPWP: string | null
    DIRECTOR: string | null
    NPWPDIR: string | null
    LOGO: string | null
    NPP: string | null
    ASTEKBAYAR: string | null
    EMAIL: string | null
    HOMEPAGE: string | null
    HRDMNG: string | null
    NPWPMNG: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: string | null
    KODE_CMPY: string | null
    COMPANY: string | null
    ADDRESS1: string | null
    ADDRESS2: string | null
    ADDRESS3: string | null
    TLP: string | null
    FAX: string | null
    NPWP: string | null
    DIRECTOR: string | null
    NPWPDIR: string | null
    LOGO: string | null
    NPP: string | null
    ASTEKBAYAR: string | null
    EMAIL: string | null
    HOMEPAGE: string | null
    HRDMNG: string | null
    NPWPMNG: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    KODE_CMPY: number
    COMPANY: number
    ADDRESS1: number
    ADDRESS2: number
    ADDRESS3: number
    TLP: number
    FAX: number
    NPWP: number
    DIRECTOR: number
    NPWPDIR: number
    LOGO: number
    NPP: number
    ASTEKBAYAR: number
    EMAIL: number
    HOMEPAGE: number
    HRDMNG: number
    NPWPMNG: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type CompanyMinAggregateInputType = {
    id?: true
    KODE_CMPY?: true
    COMPANY?: true
    ADDRESS1?: true
    ADDRESS2?: true
    ADDRESS3?: true
    TLP?: true
    FAX?: true
    NPWP?: true
    DIRECTOR?: true
    NPWPDIR?: true
    LOGO?: true
    NPP?: true
    ASTEKBAYAR?: true
    EMAIL?: true
    HOMEPAGE?: true
    HRDMNG?: true
    NPWPMNG?: true
    created_at?: true
    updated_at?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    KODE_CMPY?: true
    COMPANY?: true
    ADDRESS1?: true
    ADDRESS2?: true
    ADDRESS3?: true
    TLP?: true
    FAX?: true
    NPWP?: true
    DIRECTOR?: true
    NPWPDIR?: true
    LOGO?: true
    NPP?: true
    ASTEKBAYAR?: true
    EMAIL?: true
    HOMEPAGE?: true
    HRDMNG?: true
    NPWPMNG?: true
    created_at?: true
    updated_at?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    KODE_CMPY?: true
    COMPANY?: true
    ADDRESS1?: true
    ADDRESS2?: true
    ADDRESS3?: true
    TLP?: true
    FAX?: true
    NPWP?: true
    DIRECTOR?: true
    NPWPDIR?: true
    LOGO?: true
    NPP?: true
    ASTEKBAYAR?: true
    EMAIL?: true
    HOMEPAGE?: true
    HRDMNG?: true
    NPWPMNG?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which company to aggregate.
     */
    where?: companyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of companies to fetch.
     */
    orderBy?: companyOrderByWithRelationInput | companyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: companyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type companyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: companyWhereInput
    orderBy?: companyOrderByWithAggregationInput | companyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: companyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: string
    KODE_CMPY: string
    COMPANY: string | null
    ADDRESS1: string | null
    ADDRESS2: string | null
    ADDRESS3: string | null
    TLP: string | null
    FAX: string | null
    NPWP: string | null
    DIRECTOR: string | null
    NPWPDIR: string | null
    LOGO: string | null
    NPP: string | null
    ASTEKBAYAR: string | null
    EMAIL: string | null
    HOMEPAGE: string | null
    HRDMNG: string | null
    NPWPMNG: string | null
    created_at: Date
    updated_at: Date
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends companyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type companySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    KODE_CMPY?: boolean
    COMPANY?: boolean
    ADDRESS1?: boolean
    ADDRESS2?: boolean
    ADDRESS3?: boolean
    TLP?: boolean
    FAX?: boolean
    NPWP?: boolean
    DIRECTOR?: boolean
    NPWPDIR?: boolean
    LOGO?: boolean
    NPP?: boolean
    ASTEKBAYAR?: boolean
    EMAIL?: boolean
    HOMEPAGE?: boolean
    HRDMNG?: boolean
    NPWPMNG?: boolean
    created_at?: boolean
    updated_at?: boolean
    karyawan?: boolean | company$karyawanArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type companySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    KODE_CMPY?: boolean
    COMPANY?: boolean
    ADDRESS1?: boolean
    ADDRESS2?: boolean
    ADDRESS3?: boolean
    TLP?: boolean
    FAX?: boolean
    NPWP?: boolean
    DIRECTOR?: boolean
    NPWPDIR?: boolean
    LOGO?: boolean
    NPP?: boolean
    ASTEKBAYAR?: boolean
    EMAIL?: boolean
    HOMEPAGE?: boolean
    HRDMNG?: boolean
    NPWPMNG?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["company"]>

  export type companySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    KODE_CMPY?: boolean
    COMPANY?: boolean
    ADDRESS1?: boolean
    ADDRESS2?: boolean
    ADDRESS3?: boolean
    TLP?: boolean
    FAX?: boolean
    NPWP?: boolean
    DIRECTOR?: boolean
    NPWPDIR?: boolean
    LOGO?: boolean
    NPP?: boolean
    ASTEKBAYAR?: boolean
    EMAIL?: boolean
    HOMEPAGE?: boolean
    HRDMNG?: boolean
    NPWPMNG?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["company"]>

  export type companySelectScalar = {
    id?: boolean
    KODE_CMPY?: boolean
    COMPANY?: boolean
    ADDRESS1?: boolean
    ADDRESS2?: boolean
    ADDRESS3?: boolean
    TLP?: boolean
    FAX?: boolean
    NPWP?: boolean
    DIRECTOR?: boolean
    NPWPDIR?: boolean
    LOGO?: boolean
    NPP?: boolean
    ASTEKBAYAR?: boolean
    EMAIL?: boolean
    HOMEPAGE?: boolean
    HRDMNG?: boolean
    NPWPMNG?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type companyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "KODE_CMPY" | "COMPANY" | "ADDRESS1" | "ADDRESS2" | "ADDRESS3" | "TLP" | "FAX" | "NPWP" | "DIRECTOR" | "NPWPDIR" | "LOGO" | "NPP" | "ASTEKBAYAR" | "EMAIL" | "HOMEPAGE" | "HRDMNG" | "NPWPMNG" | "created_at" | "updated_at", ExtArgs["result"]["company"]>
  export type companyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    karyawan?: boolean | company$karyawanArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type companyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type companyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $companyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "company"
    objects: {
      karyawan: Prisma.$karyawanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      KODE_CMPY: string
      COMPANY: string | null
      ADDRESS1: string | null
      ADDRESS2: string | null
      ADDRESS3: string | null
      TLP: string | null
      FAX: string | null
      NPWP: string | null
      DIRECTOR: string | null
      NPWPDIR: string | null
      LOGO: string | null
      NPP: string | null
      ASTEKBAYAR: string | null
      EMAIL: string | null
      HOMEPAGE: string | null
      HRDMNG: string | null
      NPWPMNG: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type companyGetPayload<S extends boolean | null | undefined | companyDefaultArgs> = $Result.GetResult<Prisma.$companyPayload, S>

  type companyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<companyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface companyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['company'], meta: { name: 'company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {companyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends companyFindUniqueArgs>(args: SelectSubset<T, companyFindUniqueArgs<ExtArgs>>): Prisma__companyClient<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {companyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends companyFindUniqueOrThrowArgs>(args: SelectSubset<T, companyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__companyClient<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {companyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends companyFindFirstArgs>(args?: SelectSubset<T, companyFindFirstArgs<ExtArgs>>): Prisma__companyClient<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {companyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends companyFindFirstOrThrowArgs>(args?: SelectSubset<T, companyFindFirstOrThrowArgs<ExtArgs>>): Prisma__companyClient<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {companyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends companyFindManyArgs>(args?: SelectSubset<T, companyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {companyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends companyCreateArgs>(args: SelectSubset<T, companyCreateArgs<ExtArgs>>): Prisma__companyClient<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {companyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends companyCreateManyArgs>(args?: SelectSubset<T, companyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {companyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends companyCreateManyAndReturnArgs>(args?: SelectSubset<T, companyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Company.
     * @param {companyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends companyDeleteArgs>(args: SelectSubset<T, companyDeleteArgs<ExtArgs>>): Prisma__companyClient<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {companyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends companyUpdateArgs>(args: SelectSubset<T, companyUpdateArgs<ExtArgs>>): Prisma__companyClient<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {companyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends companyDeleteManyArgs>(args?: SelectSubset<T, companyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {companyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends companyUpdateManyArgs>(args: SelectSubset<T, companyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies and returns the data updated in the database.
     * @param {companyUpdateManyAndReturnArgs} args - Arguments to update many Companies.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends companyUpdateManyAndReturnArgs>(args: SelectSubset<T, companyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Company.
     * @param {companyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends companyUpsertArgs>(args: SelectSubset<T, companyUpsertArgs<ExtArgs>>): Prisma__companyClient<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {companyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends companyCountArgs>(
      args?: Subset<T, companyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {companyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends companyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: companyGroupByArgs['orderBy'] }
        : { orderBy?: companyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, companyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the company model
   */
  readonly fields: companyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__companyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    karyawan<T extends company$karyawanArgs<ExtArgs> = {}>(args?: Subset<T, company$karyawanArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$karyawanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the company model
   */
  interface companyFieldRefs {
    readonly id: FieldRef<"company", 'String'>
    readonly KODE_CMPY: FieldRef<"company", 'String'>
    readonly COMPANY: FieldRef<"company", 'String'>
    readonly ADDRESS1: FieldRef<"company", 'String'>
    readonly ADDRESS2: FieldRef<"company", 'String'>
    readonly ADDRESS3: FieldRef<"company", 'String'>
    readonly TLP: FieldRef<"company", 'String'>
    readonly FAX: FieldRef<"company", 'String'>
    readonly NPWP: FieldRef<"company", 'String'>
    readonly DIRECTOR: FieldRef<"company", 'String'>
    readonly NPWPDIR: FieldRef<"company", 'String'>
    readonly LOGO: FieldRef<"company", 'String'>
    readonly NPP: FieldRef<"company", 'String'>
    readonly ASTEKBAYAR: FieldRef<"company", 'String'>
    readonly EMAIL: FieldRef<"company", 'String'>
    readonly HOMEPAGE: FieldRef<"company", 'String'>
    readonly HRDMNG: FieldRef<"company", 'String'>
    readonly NPWPMNG: FieldRef<"company", 'String'>
    readonly created_at: FieldRef<"company", 'DateTime'>
    readonly updated_at: FieldRef<"company", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * company findUnique
   */
  export type companyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
    /**
     * Filter, which company to fetch.
     */
    where: companyWhereUniqueInput
  }

  /**
   * company findUniqueOrThrow
   */
  export type companyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
    /**
     * Filter, which company to fetch.
     */
    where: companyWhereUniqueInput
  }

  /**
   * company findFirst
   */
  export type companyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
    /**
     * Filter, which company to fetch.
     */
    where?: companyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of companies to fetch.
     */
    orderBy?: companyOrderByWithRelationInput | companyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for companies.
     */
    cursor?: companyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * company findFirstOrThrow
   */
  export type companyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
    /**
     * Filter, which company to fetch.
     */
    where?: companyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of companies to fetch.
     */
    orderBy?: companyOrderByWithRelationInput | companyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for companies.
     */
    cursor?: companyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * company findMany
   */
  export type companyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
    /**
     * Filter, which companies to fetch.
     */
    where?: companyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of companies to fetch.
     */
    orderBy?: companyOrderByWithRelationInput | companyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing companies.
     */
    cursor?: companyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` companies.
     */
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * company create
   */
  export type companyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
    /**
     * The data needed to create a company.
     */
    data: XOR<companyCreateInput, companyUncheckedCreateInput>
  }

  /**
   * company createMany
   */
  export type companyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many companies.
     */
    data: companyCreateManyInput | companyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * company createManyAndReturn
   */
  export type companyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * The data used to create many companies.
     */
    data: companyCreateManyInput | companyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * company update
   */
  export type companyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
    /**
     * The data needed to update a company.
     */
    data: XOR<companyUpdateInput, companyUncheckedUpdateInput>
    /**
     * Choose, which company to update.
     */
    where: companyWhereUniqueInput
  }

  /**
   * company updateMany
   */
  export type companyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update companies.
     */
    data: XOR<companyUpdateManyMutationInput, companyUncheckedUpdateManyInput>
    /**
     * Filter which companies to update
     */
    where?: companyWhereInput
    /**
     * Limit how many companies to update.
     */
    limit?: number
  }

  /**
   * company updateManyAndReturn
   */
  export type companyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * The data used to update companies.
     */
    data: XOR<companyUpdateManyMutationInput, companyUncheckedUpdateManyInput>
    /**
     * Filter which companies to update
     */
    where?: companyWhereInput
    /**
     * Limit how many companies to update.
     */
    limit?: number
  }

  /**
   * company upsert
   */
  export type companyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
    /**
     * The filter to search for the company to update in case it exists.
     */
    where: companyWhereUniqueInput
    /**
     * In case the company found by the `where` argument doesn't exist, create a new company with this data.
     */
    create: XOR<companyCreateInput, companyUncheckedCreateInput>
    /**
     * In case the company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<companyUpdateInput, companyUncheckedUpdateInput>
  }

  /**
   * company delete
   */
  export type companyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
    /**
     * Filter which company to delete.
     */
    where: companyWhereUniqueInput
  }

  /**
   * company deleteMany
   */
  export type companyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which companies to delete
     */
    where?: companyWhereInput
    /**
     * Limit how many companies to delete.
     */
    limit?: number
  }

  /**
   * company.karyawan
   */
  export type company$karyawanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the karyawan
     */
    select?: karyawanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the karyawan
     */
    omit?: karyawanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: karyawanInclude<ExtArgs> | null
    where?: karyawanWhereInput
    orderBy?: karyawanOrderByWithRelationInput | karyawanOrderByWithRelationInput[]
    cursor?: karyawanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KaryawanScalarFieldEnum | KaryawanScalarFieldEnum[]
  }

  /**
   * company without action
   */
  export type companyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
  }


  /**
   * Model karyawan
   */

  export type AggregateKaryawan = {
    _count: KaryawanCountAggregateOutputType | null
    _min: KaryawanMinAggregateOutputType | null
    _max: KaryawanMaxAggregateOutputType | null
  }

  export type KaryawanMinAggregateOutputType = {
    EMPL_ID: string | null
    user_id: string | null
    NIK: string | null
    NAMA: string | null
    KD_CMPY: string | null
    KD_FACT: string | null
    KD_BAG: string | null
    KD_DEPT: string | null
    KD_SEKSIE: string | null
    KD_PKT: string | null
    KD_JAB: string | null
    KD_AGM: string | null
    KD_SKL: string | null
    BANK_CODE: string | null
    KD_SEX: $Enums.JenisKelamin | null
    ALAMAT1: string | null
    KOTA: string | null
    TELPON: string | null
    HANDPHONE: string | null
    EMAIL: string | null
    TGL_LHR: Date | null
    TGL_MSK: Date | null
    TGL_OUT: Date | null
    ALASAN_OUT: string | null
    KD_OUT: boolean | null
    KD_JNS: $Enums.StatusKaryawan | null
    KD_STS: $Enums.StatusAktif | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type KaryawanMaxAggregateOutputType = {
    EMPL_ID: string | null
    user_id: string | null
    NIK: string | null
    NAMA: string | null
    KD_CMPY: string | null
    KD_FACT: string | null
    KD_BAG: string | null
    KD_DEPT: string | null
    KD_SEKSIE: string | null
    KD_PKT: string | null
    KD_JAB: string | null
    KD_AGM: string | null
    KD_SKL: string | null
    BANK_CODE: string | null
    KD_SEX: $Enums.JenisKelamin | null
    ALAMAT1: string | null
    KOTA: string | null
    TELPON: string | null
    HANDPHONE: string | null
    EMAIL: string | null
    TGL_LHR: Date | null
    TGL_MSK: Date | null
    TGL_OUT: Date | null
    ALASAN_OUT: string | null
    KD_OUT: boolean | null
    KD_JNS: $Enums.StatusKaryawan | null
    KD_STS: $Enums.StatusAktif | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type KaryawanCountAggregateOutputType = {
    EMPL_ID: number
    user_id: number
    NIK: number
    NAMA: number
    KD_CMPY: number
    KD_FACT: number
    KD_BAG: number
    KD_DEPT: number
    KD_SEKSIE: number
    KD_PKT: number
    KD_JAB: number
    KD_AGM: number
    KD_SKL: number
    BANK_CODE: number
    KD_SEX: number
    ALAMAT1: number
    KOTA: number
    TELPON: number
    HANDPHONE: number
    EMAIL: number
    TGL_LHR: number
    TGL_MSK: number
    TGL_OUT: number
    ALASAN_OUT: number
    KD_OUT: number
    KD_JNS: number
    KD_STS: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type KaryawanMinAggregateInputType = {
    EMPL_ID?: true
    user_id?: true
    NIK?: true
    NAMA?: true
    KD_CMPY?: true
    KD_FACT?: true
    KD_BAG?: true
    KD_DEPT?: true
    KD_SEKSIE?: true
    KD_PKT?: true
    KD_JAB?: true
    KD_AGM?: true
    KD_SKL?: true
    BANK_CODE?: true
    KD_SEX?: true
    ALAMAT1?: true
    KOTA?: true
    TELPON?: true
    HANDPHONE?: true
    EMAIL?: true
    TGL_LHR?: true
    TGL_MSK?: true
    TGL_OUT?: true
    ALASAN_OUT?: true
    KD_OUT?: true
    KD_JNS?: true
    KD_STS?: true
    created_at?: true
    updated_at?: true
  }

  export type KaryawanMaxAggregateInputType = {
    EMPL_ID?: true
    user_id?: true
    NIK?: true
    NAMA?: true
    KD_CMPY?: true
    KD_FACT?: true
    KD_BAG?: true
    KD_DEPT?: true
    KD_SEKSIE?: true
    KD_PKT?: true
    KD_JAB?: true
    KD_AGM?: true
    KD_SKL?: true
    BANK_CODE?: true
    KD_SEX?: true
    ALAMAT1?: true
    KOTA?: true
    TELPON?: true
    HANDPHONE?: true
    EMAIL?: true
    TGL_LHR?: true
    TGL_MSK?: true
    TGL_OUT?: true
    ALASAN_OUT?: true
    KD_OUT?: true
    KD_JNS?: true
    KD_STS?: true
    created_at?: true
    updated_at?: true
  }

  export type KaryawanCountAggregateInputType = {
    EMPL_ID?: true
    user_id?: true
    NIK?: true
    NAMA?: true
    KD_CMPY?: true
    KD_FACT?: true
    KD_BAG?: true
    KD_DEPT?: true
    KD_SEKSIE?: true
    KD_PKT?: true
    KD_JAB?: true
    KD_AGM?: true
    KD_SKL?: true
    BANK_CODE?: true
    KD_SEX?: true
    ALAMAT1?: true
    KOTA?: true
    TELPON?: true
    HANDPHONE?: true
    EMAIL?: true
    TGL_LHR?: true
    TGL_MSK?: true
    TGL_OUT?: true
    ALASAN_OUT?: true
    KD_OUT?: true
    KD_JNS?: true
    KD_STS?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type KaryawanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which karyawan to aggregate.
     */
    where?: karyawanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of karyawans to fetch.
     */
    orderBy?: karyawanOrderByWithRelationInput | karyawanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: karyawanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` karyawans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` karyawans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned karyawans
    **/
    _count?: true | KaryawanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KaryawanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KaryawanMaxAggregateInputType
  }

  export type GetKaryawanAggregateType<T extends KaryawanAggregateArgs> = {
        [P in keyof T & keyof AggregateKaryawan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKaryawan[P]>
      : GetScalarType<T[P], AggregateKaryawan[P]>
  }




  export type karyawanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: karyawanWhereInput
    orderBy?: karyawanOrderByWithAggregationInput | karyawanOrderByWithAggregationInput[]
    by: KaryawanScalarFieldEnum[] | KaryawanScalarFieldEnum
    having?: karyawanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KaryawanCountAggregateInputType | true
    _min?: KaryawanMinAggregateInputType
    _max?: KaryawanMaxAggregateInputType
  }

  export type KaryawanGroupByOutputType = {
    EMPL_ID: string
    user_id: string | null
    NIK: string | null
    NAMA: string | null
    KD_CMPY: string | null
    KD_FACT: string | null
    KD_BAG: string | null
    KD_DEPT: string | null
    KD_SEKSIE: string | null
    KD_PKT: string | null
    KD_JAB: string | null
    KD_AGM: string | null
    KD_SKL: string | null
    BANK_CODE: string | null
    KD_SEX: $Enums.JenisKelamin | null
    ALAMAT1: string | null
    KOTA: string | null
    TELPON: string | null
    HANDPHONE: string | null
    EMAIL: string | null
    TGL_LHR: Date | null
    TGL_MSK: Date | null
    TGL_OUT: Date | null
    ALASAN_OUT: string | null
    KD_OUT: boolean | null
    KD_JNS: $Enums.StatusKaryawan | null
    KD_STS: $Enums.StatusAktif | null
    created_at: Date
    updated_at: Date
    _count: KaryawanCountAggregateOutputType | null
    _min: KaryawanMinAggregateOutputType | null
    _max: KaryawanMaxAggregateOutputType | null
  }

  type GetKaryawanGroupByPayload<T extends karyawanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KaryawanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KaryawanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KaryawanGroupByOutputType[P]>
            : GetScalarType<T[P], KaryawanGroupByOutputType[P]>
        }
      >
    >


  export type karyawanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    EMPL_ID?: boolean
    user_id?: boolean
    NIK?: boolean
    NAMA?: boolean
    KD_CMPY?: boolean
    KD_FACT?: boolean
    KD_BAG?: boolean
    KD_DEPT?: boolean
    KD_SEKSIE?: boolean
    KD_PKT?: boolean
    KD_JAB?: boolean
    KD_AGM?: boolean
    KD_SKL?: boolean
    BANK_CODE?: boolean
    KD_SEX?: boolean
    ALAMAT1?: boolean
    KOTA?: boolean
    TELPON?: boolean
    HANDPHONE?: boolean
    EMAIL?: boolean
    TGL_LHR?: boolean
    TGL_MSK?: boolean
    TGL_OUT?: boolean
    ALASAN_OUT?: boolean
    KD_OUT?: boolean
    KD_JNS?: boolean
    KD_STS?: boolean
    created_at?: boolean
    updated_at?: boolean
    company?: boolean | karyawan$companyArgs<ExtArgs>
    mstdept?: boolean | karyawan$mstdeptArgs<ExtArgs>
    mstjab?: boolean | karyawan$mstjabArgs<ExtArgs>
    mstbag?: boolean | karyawan$mstbagArgs<ExtArgs>
    User?: boolean | karyawan$UserArgs<ExtArgs>
  }, ExtArgs["result"]["karyawan"]>

  export type karyawanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    EMPL_ID?: boolean
    user_id?: boolean
    NIK?: boolean
    NAMA?: boolean
    KD_CMPY?: boolean
    KD_FACT?: boolean
    KD_BAG?: boolean
    KD_DEPT?: boolean
    KD_SEKSIE?: boolean
    KD_PKT?: boolean
    KD_JAB?: boolean
    KD_AGM?: boolean
    KD_SKL?: boolean
    BANK_CODE?: boolean
    KD_SEX?: boolean
    ALAMAT1?: boolean
    KOTA?: boolean
    TELPON?: boolean
    HANDPHONE?: boolean
    EMAIL?: boolean
    TGL_LHR?: boolean
    TGL_MSK?: boolean
    TGL_OUT?: boolean
    ALASAN_OUT?: boolean
    KD_OUT?: boolean
    KD_JNS?: boolean
    KD_STS?: boolean
    created_at?: boolean
    updated_at?: boolean
    company?: boolean | karyawan$companyArgs<ExtArgs>
    mstdept?: boolean | karyawan$mstdeptArgs<ExtArgs>
    mstjab?: boolean | karyawan$mstjabArgs<ExtArgs>
    mstbag?: boolean | karyawan$mstbagArgs<ExtArgs>
    User?: boolean | karyawan$UserArgs<ExtArgs>
  }, ExtArgs["result"]["karyawan"]>

  export type karyawanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    EMPL_ID?: boolean
    user_id?: boolean
    NIK?: boolean
    NAMA?: boolean
    KD_CMPY?: boolean
    KD_FACT?: boolean
    KD_BAG?: boolean
    KD_DEPT?: boolean
    KD_SEKSIE?: boolean
    KD_PKT?: boolean
    KD_JAB?: boolean
    KD_AGM?: boolean
    KD_SKL?: boolean
    BANK_CODE?: boolean
    KD_SEX?: boolean
    ALAMAT1?: boolean
    KOTA?: boolean
    TELPON?: boolean
    HANDPHONE?: boolean
    EMAIL?: boolean
    TGL_LHR?: boolean
    TGL_MSK?: boolean
    TGL_OUT?: boolean
    ALASAN_OUT?: boolean
    KD_OUT?: boolean
    KD_JNS?: boolean
    KD_STS?: boolean
    created_at?: boolean
    updated_at?: boolean
    company?: boolean | karyawan$companyArgs<ExtArgs>
    mstdept?: boolean | karyawan$mstdeptArgs<ExtArgs>
    mstjab?: boolean | karyawan$mstjabArgs<ExtArgs>
    mstbag?: boolean | karyawan$mstbagArgs<ExtArgs>
    User?: boolean | karyawan$UserArgs<ExtArgs>
  }, ExtArgs["result"]["karyawan"]>

  export type karyawanSelectScalar = {
    EMPL_ID?: boolean
    user_id?: boolean
    NIK?: boolean
    NAMA?: boolean
    KD_CMPY?: boolean
    KD_FACT?: boolean
    KD_BAG?: boolean
    KD_DEPT?: boolean
    KD_SEKSIE?: boolean
    KD_PKT?: boolean
    KD_JAB?: boolean
    KD_AGM?: boolean
    KD_SKL?: boolean
    BANK_CODE?: boolean
    KD_SEX?: boolean
    ALAMAT1?: boolean
    KOTA?: boolean
    TELPON?: boolean
    HANDPHONE?: boolean
    EMAIL?: boolean
    TGL_LHR?: boolean
    TGL_MSK?: boolean
    TGL_OUT?: boolean
    ALASAN_OUT?: boolean
    KD_OUT?: boolean
    KD_JNS?: boolean
    KD_STS?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type karyawanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"EMPL_ID" | "user_id" | "NIK" | "NAMA" | "KD_CMPY" | "KD_FACT" | "KD_BAG" | "KD_DEPT" | "KD_SEKSIE" | "KD_PKT" | "KD_JAB" | "KD_AGM" | "KD_SKL" | "BANK_CODE" | "KD_SEX" | "ALAMAT1" | "KOTA" | "TELPON" | "HANDPHONE" | "EMAIL" | "TGL_LHR" | "TGL_MSK" | "TGL_OUT" | "ALASAN_OUT" | "KD_OUT" | "KD_JNS" | "KD_STS" | "created_at" | "updated_at", ExtArgs["result"]["karyawan"]>
  export type karyawanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | karyawan$companyArgs<ExtArgs>
    mstdept?: boolean | karyawan$mstdeptArgs<ExtArgs>
    mstjab?: boolean | karyawan$mstjabArgs<ExtArgs>
    mstbag?: boolean | karyawan$mstbagArgs<ExtArgs>
    User?: boolean | karyawan$UserArgs<ExtArgs>
  }
  export type karyawanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | karyawan$companyArgs<ExtArgs>
    mstdept?: boolean | karyawan$mstdeptArgs<ExtArgs>
    mstjab?: boolean | karyawan$mstjabArgs<ExtArgs>
    mstbag?: boolean | karyawan$mstbagArgs<ExtArgs>
    User?: boolean | karyawan$UserArgs<ExtArgs>
  }
  export type karyawanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | karyawan$companyArgs<ExtArgs>
    mstdept?: boolean | karyawan$mstdeptArgs<ExtArgs>
    mstjab?: boolean | karyawan$mstjabArgs<ExtArgs>
    mstbag?: boolean | karyawan$mstbagArgs<ExtArgs>
    User?: boolean | karyawan$UserArgs<ExtArgs>
  }

  export type $karyawanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "karyawan"
    objects: {
      company: Prisma.$companyPayload<ExtArgs> | null
      mstdept: Prisma.$mstdeptPayload<ExtArgs> | null
      mstjab: Prisma.$mstjabPayload<ExtArgs> | null
      mstbag: Prisma.$mstbagPayload<ExtArgs> | null
      User: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      EMPL_ID: string
      user_id: string | null
      NIK: string | null
      NAMA: string | null
      KD_CMPY: string | null
      KD_FACT: string | null
      KD_BAG: string | null
      KD_DEPT: string | null
      KD_SEKSIE: string | null
      KD_PKT: string | null
      KD_JAB: string | null
      KD_AGM: string | null
      KD_SKL: string | null
      BANK_CODE: string | null
      KD_SEX: $Enums.JenisKelamin | null
      ALAMAT1: string | null
      KOTA: string | null
      TELPON: string | null
      HANDPHONE: string | null
      EMAIL: string | null
      TGL_LHR: Date | null
      TGL_MSK: Date | null
      TGL_OUT: Date | null
      ALASAN_OUT: string | null
      KD_OUT: boolean | null
      KD_JNS: $Enums.StatusKaryawan | null
      KD_STS: $Enums.StatusAktif | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["karyawan"]>
    composites: {}
  }

  type karyawanGetPayload<S extends boolean | null | undefined | karyawanDefaultArgs> = $Result.GetResult<Prisma.$karyawanPayload, S>

  type karyawanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<karyawanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KaryawanCountAggregateInputType | true
    }

  export interface karyawanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['karyawan'], meta: { name: 'karyawan' } }
    /**
     * Find zero or one Karyawan that matches the filter.
     * @param {karyawanFindUniqueArgs} args - Arguments to find a Karyawan
     * @example
     * // Get one Karyawan
     * const karyawan = await prisma.karyawan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends karyawanFindUniqueArgs>(args: SelectSubset<T, karyawanFindUniqueArgs<ExtArgs>>): Prisma__karyawanClient<$Result.GetResult<Prisma.$karyawanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Karyawan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {karyawanFindUniqueOrThrowArgs} args - Arguments to find a Karyawan
     * @example
     * // Get one Karyawan
     * const karyawan = await prisma.karyawan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends karyawanFindUniqueOrThrowArgs>(args: SelectSubset<T, karyawanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__karyawanClient<$Result.GetResult<Prisma.$karyawanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Karyawan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {karyawanFindFirstArgs} args - Arguments to find a Karyawan
     * @example
     * // Get one Karyawan
     * const karyawan = await prisma.karyawan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends karyawanFindFirstArgs>(args?: SelectSubset<T, karyawanFindFirstArgs<ExtArgs>>): Prisma__karyawanClient<$Result.GetResult<Prisma.$karyawanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Karyawan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {karyawanFindFirstOrThrowArgs} args - Arguments to find a Karyawan
     * @example
     * // Get one Karyawan
     * const karyawan = await prisma.karyawan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends karyawanFindFirstOrThrowArgs>(args?: SelectSubset<T, karyawanFindFirstOrThrowArgs<ExtArgs>>): Prisma__karyawanClient<$Result.GetResult<Prisma.$karyawanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Karyawans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {karyawanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Karyawans
     * const karyawans = await prisma.karyawan.findMany()
     * 
     * // Get first 10 Karyawans
     * const karyawans = await prisma.karyawan.findMany({ take: 10 })
     * 
     * // Only select the `EMPL_ID`
     * const karyawanWithEMPL_IDOnly = await prisma.karyawan.findMany({ select: { EMPL_ID: true } })
     * 
     */
    findMany<T extends karyawanFindManyArgs>(args?: SelectSubset<T, karyawanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$karyawanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Karyawan.
     * @param {karyawanCreateArgs} args - Arguments to create a Karyawan.
     * @example
     * // Create one Karyawan
     * const Karyawan = await prisma.karyawan.create({
     *   data: {
     *     // ... data to create a Karyawan
     *   }
     * })
     * 
     */
    create<T extends karyawanCreateArgs>(args: SelectSubset<T, karyawanCreateArgs<ExtArgs>>): Prisma__karyawanClient<$Result.GetResult<Prisma.$karyawanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Karyawans.
     * @param {karyawanCreateManyArgs} args - Arguments to create many Karyawans.
     * @example
     * // Create many Karyawans
     * const karyawan = await prisma.karyawan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends karyawanCreateManyArgs>(args?: SelectSubset<T, karyawanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Karyawans and returns the data saved in the database.
     * @param {karyawanCreateManyAndReturnArgs} args - Arguments to create many Karyawans.
     * @example
     * // Create many Karyawans
     * const karyawan = await prisma.karyawan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Karyawans and only return the `EMPL_ID`
     * const karyawanWithEMPL_IDOnly = await prisma.karyawan.createManyAndReturn({
     *   select: { EMPL_ID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends karyawanCreateManyAndReturnArgs>(args?: SelectSubset<T, karyawanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$karyawanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Karyawan.
     * @param {karyawanDeleteArgs} args - Arguments to delete one Karyawan.
     * @example
     * // Delete one Karyawan
     * const Karyawan = await prisma.karyawan.delete({
     *   where: {
     *     // ... filter to delete one Karyawan
     *   }
     * })
     * 
     */
    delete<T extends karyawanDeleteArgs>(args: SelectSubset<T, karyawanDeleteArgs<ExtArgs>>): Prisma__karyawanClient<$Result.GetResult<Prisma.$karyawanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Karyawan.
     * @param {karyawanUpdateArgs} args - Arguments to update one Karyawan.
     * @example
     * // Update one Karyawan
     * const karyawan = await prisma.karyawan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends karyawanUpdateArgs>(args: SelectSubset<T, karyawanUpdateArgs<ExtArgs>>): Prisma__karyawanClient<$Result.GetResult<Prisma.$karyawanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Karyawans.
     * @param {karyawanDeleteManyArgs} args - Arguments to filter Karyawans to delete.
     * @example
     * // Delete a few Karyawans
     * const { count } = await prisma.karyawan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends karyawanDeleteManyArgs>(args?: SelectSubset<T, karyawanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Karyawans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {karyawanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Karyawans
     * const karyawan = await prisma.karyawan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends karyawanUpdateManyArgs>(args: SelectSubset<T, karyawanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Karyawans and returns the data updated in the database.
     * @param {karyawanUpdateManyAndReturnArgs} args - Arguments to update many Karyawans.
     * @example
     * // Update many Karyawans
     * const karyawan = await prisma.karyawan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Karyawans and only return the `EMPL_ID`
     * const karyawanWithEMPL_IDOnly = await prisma.karyawan.updateManyAndReturn({
     *   select: { EMPL_ID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends karyawanUpdateManyAndReturnArgs>(args: SelectSubset<T, karyawanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$karyawanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Karyawan.
     * @param {karyawanUpsertArgs} args - Arguments to update or create a Karyawan.
     * @example
     * // Update or create a Karyawan
     * const karyawan = await prisma.karyawan.upsert({
     *   create: {
     *     // ... data to create a Karyawan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Karyawan we want to update
     *   }
     * })
     */
    upsert<T extends karyawanUpsertArgs>(args: SelectSubset<T, karyawanUpsertArgs<ExtArgs>>): Prisma__karyawanClient<$Result.GetResult<Prisma.$karyawanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Karyawans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {karyawanCountArgs} args - Arguments to filter Karyawans to count.
     * @example
     * // Count the number of Karyawans
     * const count = await prisma.karyawan.count({
     *   where: {
     *     // ... the filter for the Karyawans we want to count
     *   }
     * })
    **/
    count<T extends karyawanCountArgs>(
      args?: Subset<T, karyawanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KaryawanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Karyawan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KaryawanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KaryawanAggregateArgs>(args: Subset<T, KaryawanAggregateArgs>): Prisma.PrismaPromise<GetKaryawanAggregateType<T>>

    /**
     * Group by Karyawan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {karyawanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends karyawanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: karyawanGroupByArgs['orderBy'] }
        : { orderBy?: karyawanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, karyawanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKaryawanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the karyawan model
   */
  readonly fields: karyawanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for karyawan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__karyawanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends karyawan$companyArgs<ExtArgs> = {}>(args?: Subset<T, karyawan$companyArgs<ExtArgs>>): Prisma__companyClient<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    mstdept<T extends karyawan$mstdeptArgs<ExtArgs> = {}>(args?: Subset<T, karyawan$mstdeptArgs<ExtArgs>>): Prisma__mstdeptClient<$Result.GetResult<Prisma.$mstdeptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    mstjab<T extends karyawan$mstjabArgs<ExtArgs> = {}>(args?: Subset<T, karyawan$mstjabArgs<ExtArgs>>): Prisma__mstjabClient<$Result.GetResult<Prisma.$mstjabPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    mstbag<T extends karyawan$mstbagArgs<ExtArgs> = {}>(args?: Subset<T, karyawan$mstbagArgs<ExtArgs>>): Prisma__mstbagClient<$Result.GetResult<Prisma.$mstbagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    User<T extends karyawan$UserArgs<ExtArgs> = {}>(args?: Subset<T, karyawan$UserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the karyawan model
   */
  interface karyawanFieldRefs {
    readonly EMPL_ID: FieldRef<"karyawan", 'String'>
    readonly user_id: FieldRef<"karyawan", 'String'>
    readonly NIK: FieldRef<"karyawan", 'String'>
    readonly NAMA: FieldRef<"karyawan", 'String'>
    readonly KD_CMPY: FieldRef<"karyawan", 'String'>
    readonly KD_FACT: FieldRef<"karyawan", 'String'>
    readonly KD_BAG: FieldRef<"karyawan", 'String'>
    readonly KD_DEPT: FieldRef<"karyawan", 'String'>
    readonly KD_SEKSIE: FieldRef<"karyawan", 'String'>
    readonly KD_PKT: FieldRef<"karyawan", 'String'>
    readonly KD_JAB: FieldRef<"karyawan", 'String'>
    readonly KD_AGM: FieldRef<"karyawan", 'String'>
    readonly KD_SKL: FieldRef<"karyawan", 'String'>
    readonly BANK_CODE: FieldRef<"karyawan", 'String'>
    readonly KD_SEX: FieldRef<"karyawan", 'JenisKelamin'>
    readonly ALAMAT1: FieldRef<"karyawan", 'String'>
    readonly KOTA: FieldRef<"karyawan", 'String'>
    readonly TELPON: FieldRef<"karyawan", 'String'>
    readonly HANDPHONE: FieldRef<"karyawan", 'String'>
    readonly EMAIL: FieldRef<"karyawan", 'String'>
    readonly TGL_LHR: FieldRef<"karyawan", 'DateTime'>
    readonly TGL_MSK: FieldRef<"karyawan", 'DateTime'>
    readonly TGL_OUT: FieldRef<"karyawan", 'DateTime'>
    readonly ALASAN_OUT: FieldRef<"karyawan", 'String'>
    readonly KD_OUT: FieldRef<"karyawan", 'Boolean'>
    readonly KD_JNS: FieldRef<"karyawan", 'StatusKaryawan'>
    readonly KD_STS: FieldRef<"karyawan", 'StatusAktif'>
    readonly created_at: FieldRef<"karyawan", 'DateTime'>
    readonly updated_at: FieldRef<"karyawan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * karyawan findUnique
   */
  export type karyawanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the karyawan
     */
    select?: karyawanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the karyawan
     */
    omit?: karyawanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: karyawanInclude<ExtArgs> | null
    /**
     * Filter, which karyawan to fetch.
     */
    where: karyawanWhereUniqueInput
  }

  /**
   * karyawan findUniqueOrThrow
   */
  export type karyawanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the karyawan
     */
    select?: karyawanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the karyawan
     */
    omit?: karyawanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: karyawanInclude<ExtArgs> | null
    /**
     * Filter, which karyawan to fetch.
     */
    where: karyawanWhereUniqueInput
  }

  /**
   * karyawan findFirst
   */
  export type karyawanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the karyawan
     */
    select?: karyawanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the karyawan
     */
    omit?: karyawanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: karyawanInclude<ExtArgs> | null
    /**
     * Filter, which karyawan to fetch.
     */
    where?: karyawanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of karyawans to fetch.
     */
    orderBy?: karyawanOrderByWithRelationInput | karyawanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for karyawans.
     */
    cursor?: karyawanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` karyawans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` karyawans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of karyawans.
     */
    distinct?: KaryawanScalarFieldEnum | KaryawanScalarFieldEnum[]
  }

  /**
   * karyawan findFirstOrThrow
   */
  export type karyawanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the karyawan
     */
    select?: karyawanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the karyawan
     */
    omit?: karyawanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: karyawanInclude<ExtArgs> | null
    /**
     * Filter, which karyawan to fetch.
     */
    where?: karyawanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of karyawans to fetch.
     */
    orderBy?: karyawanOrderByWithRelationInput | karyawanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for karyawans.
     */
    cursor?: karyawanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` karyawans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` karyawans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of karyawans.
     */
    distinct?: KaryawanScalarFieldEnum | KaryawanScalarFieldEnum[]
  }

  /**
   * karyawan findMany
   */
  export type karyawanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the karyawan
     */
    select?: karyawanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the karyawan
     */
    omit?: karyawanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: karyawanInclude<ExtArgs> | null
    /**
     * Filter, which karyawans to fetch.
     */
    where?: karyawanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of karyawans to fetch.
     */
    orderBy?: karyawanOrderByWithRelationInput | karyawanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing karyawans.
     */
    cursor?: karyawanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` karyawans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` karyawans.
     */
    skip?: number
    distinct?: KaryawanScalarFieldEnum | KaryawanScalarFieldEnum[]
  }

  /**
   * karyawan create
   */
  export type karyawanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the karyawan
     */
    select?: karyawanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the karyawan
     */
    omit?: karyawanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: karyawanInclude<ExtArgs> | null
    /**
     * The data needed to create a karyawan.
     */
    data: XOR<karyawanCreateInput, karyawanUncheckedCreateInput>
  }

  /**
   * karyawan createMany
   */
  export type karyawanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many karyawans.
     */
    data: karyawanCreateManyInput | karyawanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * karyawan createManyAndReturn
   */
  export type karyawanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the karyawan
     */
    select?: karyawanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the karyawan
     */
    omit?: karyawanOmit<ExtArgs> | null
    /**
     * The data used to create many karyawans.
     */
    data: karyawanCreateManyInput | karyawanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: karyawanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * karyawan update
   */
  export type karyawanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the karyawan
     */
    select?: karyawanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the karyawan
     */
    omit?: karyawanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: karyawanInclude<ExtArgs> | null
    /**
     * The data needed to update a karyawan.
     */
    data: XOR<karyawanUpdateInput, karyawanUncheckedUpdateInput>
    /**
     * Choose, which karyawan to update.
     */
    where: karyawanWhereUniqueInput
  }

  /**
   * karyawan updateMany
   */
  export type karyawanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update karyawans.
     */
    data: XOR<karyawanUpdateManyMutationInput, karyawanUncheckedUpdateManyInput>
    /**
     * Filter which karyawans to update
     */
    where?: karyawanWhereInput
    /**
     * Limit how many karyawans to update.
     */
    limit?: number
  }

  /**
   * karyawan updateManyAndReturn
   */
  export type karyawanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the karyawan
     */
    select?: karyawanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the karyawan
     */
    omit?: karyawanOmit<ExtArgs> | null
    /**
     * The data used to update karyawans.
     */
    data: XOR<karyawanUpdateManyMutationInput, karyawanUncheckedUpdateManyInput>
    /**
     * Filter which karyawans to update
     */
    where?: karyawanWhereInput
    /**
     * Limit how many karyawans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: karyawanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * karyawan upsert
   */
  export type karyawanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the karyawan
     */
    select?: karyawanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the karyawan
     */
    omit?: karyawanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: karyawanInclude<ExtArgs> | null
    /**
     * The filter to search for the karyawan to update in case it exists.
     */
    where: karyawanWhereUniqueInput
    /**
     * In case the karyawan found by the `where` argument doesn't exist, create a new karyawan with this data.
     */
    create: XOR<karyawanCreateInput, karyawanUncheckedCreateInput>
    /**
     * In case the karyawan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<karyawanUpdateInput, karyawanUncheckedUpdateInput>
  }

  /**
   * karyawan delete
   */
  export type karyawanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the karyawan
     */
    select?: karyawanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the karyawan
     */
    omit?: karyawanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: karyawanInclude<ExtArgs> | null
    /**
     * Filter which karyawan to delete.
     */
    where: karyawanWhereUniqueInput
  }

  /**
   * karyawan deleteMany
   */
  export type karyawanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which karyawans to delete
     */
    where?: karyawanWhereInput
    /**
     * Limit how many karyawans to delete.
     */
    limit?: number
  }

  /**
   * karyawan.company
   */
  export type karyawan$companyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
    where?: companyWhereInput
  }

  /**
   * karyawan.mstdept
   */
  export type karyawan$mstdeptArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstdept
     */
    select?: mstdeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstdept
     */
    omit?: mstdeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstdeptInclude<ExtArgs> | null
    where?: mstdeptWhereInput
  }

  /**
   * karyawan.mstjab
   */
  export type karyawan$mstjabArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstjab
     */
    select?: mstjabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstjab
     */
    omit?: mstjabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstjabInclude<ExtArgs> | null
    where?: mstjabWhereInput
  }

  /**
   * karyawan.mstbag
   */
  export type karyawan$mstbagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstbag
     */
    select?: mstbagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstbag
     */
    omit?: mstbagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstbagInclude<ExtArgs> | null
    where?: mstbagWhereInput
  }

  /**
   * karyawan.User
   */
  export type karyawan$UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * karyawan without action
   */
  export type karyawanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the karyawan
     */
    select?: karyawanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the karyawan
     */
    omit?: karyawanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: karyawanInclude<ExtArgs> | null
  }


  /**
   * Model mstdept
   */

  export type AggregateMstdept = {
    _count: MstdeptCountAggregateOutputType | null
    _min: MstdeptMinAggregateOutputType | null
    _max: MstdeptMaxAggregateOutputType | null
  }

  export type MstdeptMinAggregateOutputType = {
    id: string | null
    CKD_DEPT: string | null
    CNM_DEPT: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type MstdeptMaxAggregateOutputType = {
    id: string | null
    CKD_DEPT: string | null
    CNM_DEPT: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type MstdeptCountAggregateOutputType = {
    id: number
    CKD_DEPT: number
    CNM_DEPT: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type MstdeptMinAggregateInputType = {
    id?: true
    CKD_DEPT?: true
    CNM_DEPT?: true
    created_at?: true
    updated_at?: true
  }

  export type MstdeptMaxAggregateInputType = {
    id?: true
    CKD_DEPT?: true
    CNM_DEPT?: true
    created_at?: true
    updated_at?: true
  }

  export type MstdeptCountAggregateInputType = {
    id?: true
    CKD_DEPT?: true
    CNM_DEPT?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type MstdeptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which mstdept to aggregate.
     */
    where?: mstdeptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mstdepts to fetch.
     */
    orderBy?: mstdeptOrderByWithRelationInput | mstdeptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: mstdeptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mstdepts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mstdepts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned mstdepts
    **/
    _count?: true | MstdeptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MstdeptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MstdeptMaxAggregateInputType
  }

  export type GetMstdeptAggregateType<T extends MstdeptAggregateArgs> = {
        [P in keyof T & keyof AggregateMstdept]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMstdept[P]>
      : GetScalarType<T[P], AggregateMstdept[P]>
  }




  export type mstdeptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: mstdeptWhereInput
    orderBy?: mstdeptOrderByWithAggregationInput | mstdeptOrderByWithAggregationInput[]
    by: MstdeptScalarFieldEnum[] | MstdeptScalarFieldEnum
    having?: mstdeptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MstdeptCountAggregateInputType | true
    _min?: MstdeptMinAggregateInputType
    _max?: MstdeptMaxAggregateInputType
  }

  export type MstdeptGroupByOutputType = {
    id: string
    CKD_DEPT: string
    CNM_DEPT: string | null
    created_at: Date
    updated_at: Date
    _count: MstdeptCountAggregateOutputType | null
    _min: MstdeptMinAggregateOutputType | null
    _max: MstdeptMaxAggregateOutputType | null
  }

  type GetMstdeptGroupByPayload<T extends mstdeptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MstdeptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MstdeptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MstdeptGroupByOutputType[P]>
            : GetScalarType<T[P], MstdeptGroupByOutputType[P]>
        }
      >
    >


  export type mstdeptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    CKD_DEPT?: boolean
    CNM_DEPT?: boolean
    created_at?: boolean
    updated_at?: boolean
    karyawan?: boolean | mstdept$karyawanArgs<ExtArgs>
    _count?: boolean | MstdeptCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mstdept"]>

  export type mstdeptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    CKD_DEPT?: boolean
    CNM_DEPT?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["mstdept"]>

  export type mstdeptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    CKD_DEPT?: boolean
    CNM_DEPT?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["mstdept"]>

  export type mstdeptSelectScalar = {
    id?: boolean
    CKD_DEPT?: boolean
    CNM_DEPT?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type mstdeptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "CKD_DEPT" | "CNM_DEPT" | "created_at" | "updated_at", ExtArgs["result"]["mstdept"]>
  export type mstdeptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    karyawan?: boolean | mstdept$karyawanArgs<ExtArgs>
    _count?: boolean | MstdeptCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type mstdeptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type mstdeptIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $mstdeptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "mstdept"
    objects: {
      karyawan: Prisma.$karyawanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      CKD_DEPT: string
      CNM_DEPT: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["mstdept"]>
    composites: {}
  }

  type mstdeptGetPayload<S extends boolean | null | undefined | mstdeptDefaultArgs> = $Result.GetResult<Prisma.$mstdeptPayload, S>

  type mstdeptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<mstdeptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MstdeptCountAggregateInputType | true
    }

  export interface mstdeptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['mstdept'], meta: { name: 'mstdept' } }
    /**
     * Find zero or one Mstdept that matches the filter.
     * @param {mstdeptFindUniqueArgs} args - Arguments to find a Mstdept
     * @example
     * // Get one Mstdept
     * const mstdept = await prisma.mstdept.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends mstdeptFindUniqueArgs>(args: SelectSubset<T, mstdeptFindUniqueArgs<ExtArgs>>): Prisma__mstdeptClient<$Result.GetResult<Prisma.$mstdeptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mstdept that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {mstdeptFindUniqueOrThrowArgs} args - Arguments to find a Mstdept
     * @example
     * // Get one Mstdept
     * const mstdept = await prisma.mstdept.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends mstdeptFindUniqueOrThrowArgs>(args: SelectSubset<T, mstdeptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__mstdeptClient<$Result.GetResult<Prisma.$mstdeptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mstdept that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mstdeptFindFirstArgs} args - Arguments to find a Mstdept
     * @example
     * // Get one Mstdept
     * const mstdept = await prisma.mstdept.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends mstdeptFindFirstArgs>(args?: SelectSubset<T, mstdeptFindFirstArgs<ExtArgs>>): Prisma__mstdeptClient<$Result.GetResult<Prisma.$mstdeptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mstdept that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mstdeptFindFirstOrThrowArgs} args - Arguments to find a Mstdept
     * @example
     * // Get one Mstdept
     * const mstdept = await prisma.mstdept.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends mstdeptFindFirstOrThrowArgs>(args?: SelectSubset<T, mstdeptFindFirstOrThrowArgs<ExtArgs>>): Prisma__mstdeptClient<$Result.GetResult<Prisma.$mstdeptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mstdepts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mstdeptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mstdepts
     * const mstdepts = await prisma.mstdept.findMany()
     * 
     * // Get first 10 Mstdepts
     * const mstdepts = await prisma.mstdept.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mstdeptWithIdOnly = await prisma.mstdept.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends mstdeptFindManyArgs>(args?: SelectSubset<T, mstdeptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mstdeptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mstdept.
     * @param {mstdeptCreateArgs} args - Arguments to create a Mstdept.
     * @example
     * // Create one Mstdept
     * const Mstdept = await prisma.mstdept.create({
     *   data: {
     *     // ... data to create a Mstdept
     *   }
     * })
     * 
     */
    create<T extends mstdeptCreateArgs>(args: SelectSubset<T, mstdeptCreateArgs<ExtArgs>>): Prisma__mstdeptClient<$Result.GetResult<Prisma.$mstdeptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mstdepts.
     * @param {mstdeptCreateManyArgs} args - Arguments to create many Mstdepts.
     * @example
     * // Create many Mstdepts
     * const mstdept = await prisma.mstdept.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends mstdeptCreateManyArgs>(args?: SelectSubset<T, mstdeptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Mstdepts and returns the data saved in the database.
     * @param {mstdeptCreateManyAndReturnArgs} args - Arguments to create many Mstdepts.
     * @example
     * // Create many Mstdepts
     * const mstdept = await prisma.mstdept.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Mstdepts and only return the `id`
     * const mstdeptWithIdOnly = await prisma.mstdept.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends mstdeptCreateManyAndReturnArgs>(args?: SelectSubset<T, mstdeptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mstdeptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mstdept.
     * @param {mstdeptDeleteArgs} args - Arguments to delete one Mstdept.
     * @example
     * // Delete one Mstdept
     * const Mstdept = await prisma.mstdept.delete({
     *   where: {
     *     // ... filter to delete one Mstdept
     *   }
     * })
     * 
     */
    delete<T extends mstdeptDeleteArgs>(args: SelectSubset<T, mstdeptDeleteArgs<ExtArgs>>): Prisma__mstdeptClient<$Result.GetResult<Prisma.$mstdeptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mstdept.
     * @param {mstdeptUpdateArgs} args - Arguments to update one Mstdept.
     * @example
     * // Update one Mstdept
     * const mstdept = await prisma.mstdept.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends mstdeptUpdateArgs>(args: SelectSubset<T, mstdeptUpdateArgs<ExtArgs>>): Prisma__mstdeptClient<$Result.GetResult<Prisma.$mstdeptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mstdepts.
     * @param {mstdeptDeleteManyArgs} args - Arguments to filter Mstdepts to delete.
     * @example
     * // Delete a few Mstdepts
     * const { count } = await prisma.mstdept.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends mstdeptDeleteManyArgs>(args?: SelectSubset<T, mstdeptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mstdepts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mstdeptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mstdepts
     * const mstdept = await prisma.mstdept.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends mstdeptUpdateManyArgs>(args: SelectSubset<T, mstdeptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mstdepts and returns the data updated in the database.
     * @param {mstdeptUpdateManyAndReturnArgs} args - Arguments to update many Mstdepts.
     * @example
     * // Update many Mstdepts
     * const mstdept = await prisma.mstdept.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Mstdepts and only return the `id`
     * const mstdeptWithIdOnly = await prisma.mstdept.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends mstdeptUpdateManyAndReturnArgs>(args: SelectSubset<T, mstdeptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mstdeptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mstdept.
     * @param {mstdeptUpsertArgs} args - Arguments to update or create a Mstdept.
     * @example
     * // Update or create a Mstdept
     * const mstdept = await prisma.mstdept.upsert({
     *   create: {
     *     // ... data to create a Mstdept
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mstdept we want to update
     *   }
     * })
     */
    upsert<T extends mstdeptUpsertArgs>(args: SelectSubset<T, mstdeptUpsertArgs<ExtArgs>>): Prisma__mstdeptClient<$Result.GetResult<Prisma.$mstdeptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Mstdepts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mstdeptCountArgs} args - Arguments to filter Mstdepts to count.
     * @example
     * // Count the number of Mstdepts
     * const count = await prisma.mstdept.count({
     *   where: {
     *     // ... the filter for the Mstdepts we want to count
     *   }
     * })
    **/
    count<T extends mstdeptCountArgs>(
      args?: Subset<T, mstdeptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MstdeptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mstdept.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MstdeptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MstdeptAggregateArgs>(args: Subset<T, MstdeptAggregateArgs>): Prisma.PrismaPromise<GetMstdeptAggregateType<T>>

    /**
     * Group by Mstdept.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mstdeptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends mstdeptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: mstdeptGroupByArgs['orderBy'] }
        : { orderBy?: mstdeptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, mstdeptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMstdeptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the mstdept model
   */
  readonly fields: mstdeptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for mstdept.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__mstdeptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    karyawan<T extends mstdept$karyawanArgs<ExtArgs> = {}>(args?: Subset<T, mstdept$karyawanArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$karyawanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the mstdept model
   */
  interface mstdeptFieldRefs {
    readonly id: FieldRef<"mstdept", 'String'>
    readonly CKD_DEPT: FieldRef<"mstdept", 'String'>
    readonly CNM_DEPT: FieldRef<"mstdept", 'String'>
    readonly created_at: FieldRef<"mstdept", 'DateTime'>
    readonly updated_at: FieldRef<"mstdept", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * mstdept findUnique
   */
  export type mstdeptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstdept
     */
    select?: mstdeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstdept
     */
    omit?: mstdeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstdeptInclude<ExtArgs> | null
    /**
     * Filter, which mstdept to fetch.
     */
    where: mstdeptWhereUniqueInput
  }

  /**
   * mstdept findUniqueOrThrow
   */
  export type mstdeptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstdept
     */
    select?: mstdeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstdept
     */
    omit?: mstdeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstdeptInclude<ExtArgs> | null
    /**
     * Filter, which mstdept to fetch.
     */
    where: mstdeptWhereUniqueInput
  }

  /**
   * mstdept findFirst
   */
  export type mstdeptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstdept
     */
    select?: mstdeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstdept
     */
    omit?: mstdeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstdeptInclude<ExtArgs> | null
    /**
     * Filter, which mstdept to fetch.
     */
    where?: mstdeptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mstdepts to fetch.
     */
    orderBy?: mstdeptOrderByWithRelationInput | mstdeptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for mstdepts.
     */
    cursor?: mstdeptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mstdepts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mstdepts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of mstdepts.
     */
    distinct?: MstdeptScalarFieldEnum | MstdeptScalarFieldEnum[]
  }

  /**
   * mstdept findFirstOrThrow
   */
  export type mstdeptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstdept
     */
    select?: mstdeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstdept
     */
    omit?: mstdeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstdeptInclude<ExtArgs> | null
    /**
     * Filter, which mstdept to fetch.
     */
    where?: mstdeptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mstdepts to fetch.
     */
    orderBy?: mstdeptOrderByWithRelationInput | mstdeptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for mstdepts.
     */
    cursor?: mstdeptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mstdepts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mstdepts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of mstdepts.
     */
    distinct?: MstdeptScalarFieldEnum | MstdeptScalarFieldEnum[]
  }

  /**
   * mstdept findMany
   */
  export type mstdeptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstdept
     */
    select?: mstdeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstdept
     */
    omit?: mstdeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstdeptInclude<ExtArgs> | null
    /**
     * Filter, which mstdepts to fetch.
     */
    where?: mstdeptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mstdepts to fetch.
     */
    orderBy?: mstdeptOrderByWithRelationInput | mstdeptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing mstdepts.
     */
    cursor?: mstdeptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mstdepts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mstdepts.
     */
    skip?: number
    distinct?: MstdeptScalarFieldEnum | MstdeptScalarFieldEnum[]
  }

  /**
   * mstdept create
   */
  export type mstdeptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstdept
     */
    select?: mstdeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstdept
     */
    omit?: mstdeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstdeptInclude<ExtArgs> | null
    /**
     * The data needed to create a mstdept.
     */
    data: XOR<mstdeptCreateInput, mstdeptUncheckedCreateInput>
  }

  /**
   * mstdept createMany
   */
  export type mstdeptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many mstdepts.
     */
    data: mstdeptCreateManyInput | mstdeptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * mstdept createManyAndReturn
   */
  export type mstdeptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstdept
     */
    select?: mstdeptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the mstdept
     */
    omit?: mstdeptOmit<ExtArgs> | null
    /**
     * The data used to create many mstdepts.
     */
    data: mstdeptCreateManyInput | mstdeptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * mstdept update
   */
  export type mstdeptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstdept
     */
    select?: mstdeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstdept
     */
    omit?: mstdeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstdeptInclude<ExtArgs> | null
    /**
     * The data needed to update a mstdept.
     */
    data: XOR<mstdeptUpdateInput, mstdeptUncheckedUpdateInput>
    /**
     * Choose, which mstdept to update.
     */
    where: mstdeptWhereUniqueInput
  }

  /**
   * mstdept updateMany
   */
  export type mstdeptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update mstdepts.
     */
    data: XOR<mstdeptUpdateManyMutationInput, mstdeptUncheckedUpdateManyInput>
    /**
     * Filter which mstdepts to update
     */
    where?: mstdeptWhereInput
    /**
     * Limit how many mstdepts to update.
     */
    limit?: number
  }

  /**
   * mstdept updateManyAndReturn
   */
  export type mstdeptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstdept
     */
    select?: mstdeptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the mstdept
     */
    omit?: mstdeptOmit<ExtArgs> | null
    /**
     * The data used to update mstdepts.
     */
    data: XOR<mstdeptUpdateManyMutationInput, mstdeptUncheckedUpdateManyInput>
    /**
     * Filter which mstdepts to update
     */
    where?: mstdeptWhereInput
    /**
     * Limit how many mstdepts to update.
     */
    limit?: number
  }

  /**
   * mstdept upsert
   */
  export type mstdeptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstdept
     */
    select?: mstdeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstdept
     */
    omit?: mstdeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstdeptInclude<ExtArgs> | null
    /**
     * The filter to search for the mstdept to update in case it exists.
     */
    where: mstdeptWhereUniqueInput
    /**
     * In case the mstdept found by the `where` argument doesn't exist, create a new mstdept with this data.
     */
    create: XOR<mstdeptCreateInput, mstdeptUncheckedCreateInput>
    /**
     * In case the mstdept was found with the provided `where` argument, update it with this data.
     */
    update: XOR<mstdeptUpdateInput, mstdeptUncheckedUpdateInput>
  }

  /**
   * mstdept delete
   */
  export type mstdeptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstdept
     */
    select?: mstdeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstdept
     */
    omit?: mstdeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstdeptInclude<ExtArgs> | null
    /**
     * Filter which mstdept to delete.
     */
    where: mstdeptWhereUniqueInput
  }

  /**
   * mstdept deleteMany
   */
  export type mstdeptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which mstdepts to delete
     */
    where?: mstdeptWhereInput
    /**
     * Limit how many mstdepts to delete.
     */
    limit?: number
  }

  /**
   * mstdept.karyawan
   */
  export type mstdept$karyawanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the karyawan
     */
    select?: karyawanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the karyawan
     */
    omit?: karyawanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: karyawanInclude<ExtArgs> | null
    where?: karyawanWhereInput
    orderBy?: karyawanOrderByWithRelationInput | karyawanOrderByWithRelationInput[]
    cursor?: karyawanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KaryawanScalarFieldEnum | KaryawanScalarFieldEnum[]
  }

  /**
   * mstdept without action
   */
  export type mstdeptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstdept
     */
    select?: mstdeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstdept
     */
    omit?: mstdeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstdeptInclude<ExtArgs> | null
  }


  /**
   * Model mstjab
   */

  export type AggregateMstjab = {
    _count: MstjabCountAggregateOutputType | null
    _min: MstjabMinAggregateOutputType | null
    _max: MstjabMaxAggregateOutputType | null
  }

  export type MstjabMinAggregateOutputType = {
    id: string | null
    CKD_JAB: string | null
    CNM_JAB: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type MstjabMaxAggregateOutputType = {
    id: string | null
    CKD_JAB: string | null
    CNM_JAB: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type MstjabCountAggregateOutputType = {
    id: number
    CKD_JAB: number
    CNM_JAB: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type MstjabMinAggregateInputType = {
    id?: true
    CKD_JAB?: true
    CNM_JAB?: true
    created_at?: true
    updated_at?: true
  }

  export type MstjabMaxAggregateInputType = {
    id?: true
    CKD_JAB?: true
    CNM_JAB?: true
    created_at?: true
    updated_at?: true
  }

  export type MstjabCountAggregateInputType = {
    id?: true
    CKD_JAB?: true
    CNM_JAB?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type MstjabAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which mstjab to aggregate.
     */
    where?: mstjabWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mstjabs to fetch.
     */
    orderBy?: mstjabOrderByWithRelationInput | mstjabOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: mstjabWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mstjabs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mstjabs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned mstjabs
    **/
    _count?: true | MstjabCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MstjabMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MstjabMaxAggregateInputType
  }

  export type GetMstjabAggregateType<T extends MstjabAggregateArgs> = {
        [P in keyof T & keyof AggregateMstjab]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMstjab[P]>
      : GetScalarType<T[P], AggregateMstjab[P]>
  }




  export type mstjabGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: mstjabWhereInput
    orderBy?: mstjabOrderByWithAggregationInput | mstjabOrderByWithAggregationInput[]
    by: MstjabScalarFieldEnum[] | MstjabScalarFieldEnum
    having?: mstjabScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MstjabCountAggregateInputType | true
    _min?: MstjabMinAggregateInputType
    _max?: MstjabMaxAggregateInputType
  }

  export type MstjabGroupByOutputType = {
    id: string
    CKD_JAB: string
    CNM_JAB: string | null
    created_at: Date
    updated_at: Date
    _count: MstjabCountAggregateOutputType | null
    _min: MstjabMinAggregateOutputType | null
    _max: MstjabMaxAggregateOutputType | null
  }

  type GetMstjabGroupByPayload<T extends mstjabGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MstjabGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MstjabGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MstjabGroupByOutputType[P]>
            : GetScalarType<T[P], MstjabGroupByOutputType[P]>
        }
      >
    >


  export type mstjabSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    CKD_JAB?: boolean
    CNM_JAB?: boolean
    created_at?: boolean
    updated_at?: boolean
    karyawan?: boolean | mstjab$karyawanArgs<ExtArgs>
    _count?: boolean | MstjabCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mstjab"]>

  export type mstjabSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    CKD_JAB?: boolean
    CNM_JAB?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["mstjab"]>

  export type mstjabSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    CKD_JAB?: boolean
    CNM_JAB?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["mstjab"]>

  export type mstjabSelectScalar = {
    id?: boolean
    CKD_JAB?: boolean
    CNM_JAB?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type mstjabOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "CKD_JAB" | "CNM_JAB" | "created_at" | "updated_at", ExtArgs["result"]["mstjab"]>
  export type mstjabInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    karyawan?: boolean | mstjab$karyawanArgs<ExtArgs>
    _count?: boolean | MstjabCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type mstjabIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type mstjabIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $mstjabPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "mstjab"
    objects: {
      karyawan: Prisma.$karyawanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      CKD_JAB: string
      CNM_JAB: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["mstjab"]>
    composites: {}
  }

  type mstjabGetPayload<S extends boolean | null | undefined | mstjabDefaultArgs> = $Result.GetResult<Prisma.$mstjabPayload, S>

  type mstjabCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<mstjabFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MstjabCountAggregateInputType | true
    }

  export interface mstjabDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['mstjab'], meta: { name: 'mstjab' } }
    /**
     * Find zero or one Mstjab that matches the filter.
     * @param {mstjabFindUniqueArgs} args - Arguments to find a Mstjab
     * @example
     * // Get one Mstjab
     * const mstjab = await prisma.mstjab.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends mstjabFindUniqueArgs>(args: SelectSubset<T, mstjabFindUniqueArgs<ExtArgs>>): Prisma__mstjabClient<$Result.GetResult<Prisma.$mstjabPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mstjab that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {mstjabFindUniqueOrThrowArgs} args - Arguments to find a Mstjab
     * @example
     * // Get one Mstjab
     * const mstjab = await prisma.mstjab.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends mstjabFindUniqueOrThrowArgs>(args: SelectSubset<T, mstjabFindUniqueOrThrowArgs<ExtArgs>>): Prisma__mstjabClient<$Result.GetResult<Prisma.$mstjabPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mstjab that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mstjabFindFirstArgs} args - Arguments to find a Mstjab
     * @example
     * // Get one Mstjab
     * const mstjab = await prisma.mstjab.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends mstjabFindFirstArgs>(args?: SelectSubset<T, mstjabFindFirstArgs<ExtArgs>>): Prisma__mstjabClient<$Result.GetResult<Prisma.$mstjabPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mstjab that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mstjabFindFirstOrThrowArgs} args - Arguments to find a Mstjab
     * @example
     * // Get one Mstjab
     * const mstjab = await prisma.mstjab.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends mstjabFindFirstOrThrowArgs>(args?: SelectSubset<T, mstjabFindFirstOrThrowArgs<ExtArgs>>): Prisma__mstjabClient<$Result.GetResult<Prisma.$mstjabPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mstjabs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mstjabFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mstjabs
     * const mstjabs = await prisma.mstjab.findMany()
     * 
     * // Get first 10 Mstjabs
     * const mstjabs = await prisma.mstjab.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mstjabWithIdOnly = await prisma.mstjab.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends mstjabFindManyArgs>(args?: SelectSubset<T, mstjabFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mstjabPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mstjab.
     * @param {mstjabCreateArgs} args - Arguments to create a Mstjab.
     * @example
     * // Create one Mstjab
     * const Mstjab = await prisma.mstjab.create({
     *   data: {
     *     // ... data to create a Mstjab
     *   }
     * })
     * 
     */
    create<T extends mstjabCreateArgs>(args: SelectSubset<T, mstjabCreateArgs<ExtArgs>>): Prisma__mstjabClient<$Result.GetResult<Prisma.$mstjabPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mstjabs.
     * @param {mstjabCreateManyArgs} args - Arguments to create many Mstjabs.
     * @example
     * // Create many Mstjabs
     * const mstjab = await prisma.mstjab.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends mstjabCreateManyArgs>(args?: SelectSubset<T, mstjabCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Mstjabs and returns the data saved in the database.
     * @param {mstjabCreateManyAndReturnArgs} args - Arguments to create many Mstjabs.
     * @example
     * // Create many Mstjabs
     * const mstjab = await prisma.mstjab.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Mstjabs and only return the `id`
     * const mstjabWithIdOnly = await prisma.mstjab.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends mstjabCreateManyAndReturnArgs>(args?: SelectSubset<T, mstjabCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mstjabPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mstjab.
     * @param {mstjabDeleteArgs} args - Arguments to delete one Mstjab.
     * @example
     * // Delete one Mstjab
     * const Mstjab = await prisma.mstjab.delete({
     *   where: {
     *     // ... filter to delete one Mstjab
     *   }
     * })
     * 
     */
    delete<T extends mstjabDeleteArgs>(args: SelectSubset<T, mstjabDeleteArgs<ExtArgs>>): Prisma__mstjabClient<$Result.GetResult<Prisma.$mstjabPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mstjab.
     * @param {mstjabUpdateArgs} args - Arguments to update one Mstjab.
     * @example
     * // Update one Mstjab
     * const mstjab = await prisma.mstjab.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends mstjabUpdateArgs>(args: SelectSubset<T, mstjabUpdateArgs<ExtArgs>>): Prisma__mstjabClient<$Result.GetResult<Prisma.$mstjabPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mstjabs.
     * @param {mstjabDeleteManyArgs} args - Arguments to filter Mstjabs to delete.
     * @example
     * // Delete a few Mstjabs
     * const { count } = await prisma.mstjab.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends mstjabDeleteManyArgs>(args?: SelectSubset<T, mstjabDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mstjabs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mstjabUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mstjabs
     * const mstjab = await prisma.mstjab.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends mstjabUpdateManyArgs>(args: SelectSubset<T, mstjabUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mstjabs and returns the data updated in the database.
     * @param {mstjabUpdateManyAndReturnArgs} args - Arguments to update many Mstjabs.
     * @example
     * // Update many Mstjabs
     * const mstjab = await prisma.mstjab.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Mstjabs and only return the `id`
     * const mstjabWithIdOnly = await prisma.mstjab.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends mstjabUpdateManyAndReturnArgs>(args: SelectSubset<T, mstjabUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mstjabPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mstjab.
     * @param {mstjabUpsertArgs} args - Arguments to update or create a Mstjab.
     * @example
     * // Update or create a Mstjab
     * const mstjab = await prisma.mstjab.upsert({
     *   create: {
     *     // ... data to create a Mstjab
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mstjab we want to update
     *   }
     * })
     */
    upsert<T extends mstjabUpsertArgs>(args: SelectSubset<T, mstjabUpsertArgs<ExtArgs>>): Prisma__mstjabClient<$Result.GetResult<Prisma.$mstjabPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Mstjabs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mstjabCountArgs} args - Arguments to filter Mstjabs to count.
     * @example
     * // Count the number of Mstjabs
     * const count = await prisma.mstjab.count({
     *   where: {
     *     // ... the filter for the Mstjabs we want to count
     *   }
     * })
    **/
    count<T extends mstjabCountArgs>(
      args?: Subset<T, mstjabCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MstjabCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mstjab.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MstjabAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MstjabAggregateArgs>(args: Subset<T, MstjabAggregateArgs>): Prisma.PrismaPromise<GetMstjabAggregateType<T>>

    /**
     * Group by Mstjab.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mstjabGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends mstjabGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: mstjabGroupByArgs['orderBy'] }
        : { orderBy?: mstjabGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, mstjabGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMstjabGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the mstjab model
   */
  readonly fields: mstjabFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for mstjab.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__mstjabClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    karyawan<T extends mstjab$karyawanArgs<ExtArgs> = {}>(args?: Subset<T, mstjab$karyawanArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$karyawanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the mstjab model
   */
  interface mstjabFieldRefs {
    readonly id: FieldRef<"mstjab", 'String'>
    readonly CKD_JAB: FieldRef<"mstjab", 'String'>
    readonly CNM_JAB: FieldRef<"mstjab", 'String'>
    readonly created_at: FieldRef<"mstjab", 'DateTime'>
    readonly updated_at: FieldRef<"mstjab", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * mstjab findUnique
   */
  export type mstjabFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstjab
     */
    select?: mstjabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstjab
     */
    omit?: mstjabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstjabInclude<ExtArgs> | null
    /**
     * Filter, which mstjab to fetch.
     */
    where: mstjabWhereUniqueInput
  }

  /**
   * mstjab findUniqueOrThrow
   */
  export type mstjabFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstjab
     */
    select?: mstjabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstjab
     */
    omit?: mstjabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstjabInclude<ExtArgs> | null
    /**
     * Filter, which mstjab to fetch.
     */
    where: mstjabWhereUniqueInput
  }

  /**
   * mstjab findFirst
   */
  export type mstjabFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstjab
     */
    select?: mstjabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstjab
     */
    omit?: mstjabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstjabInclude<ExtArgs> | null
    /**
     * Filter, which mstjab to fetch.
     */
    where?: mstjabWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mstjabs to fetch.
     */
    orderBy?: mstjabOrderByWithRelationInput | mstjabOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for mstjabs.
     */
    cursor?: mstjabWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mstjabs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mstjabs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of mstjabs.
     */
    distinct?: MstjabScalarFieldEnum | MstjabScalarFieldEnum[]
  }

  /**
   * mstjab findFirstOrThrow
   */
  export type mstjabFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstjab
     */
    select?: mstjabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstjab
     */
    omit?: mstjabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstjabInclude<ExtArgs> | null
    /**
     * Filter, which mstjab to fetch.
     */
    where?: mstjabWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mstjabs to fetch.
     */
    orderBy?: mstjabOrderByWithRelationInput | mstjabOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for mstjabs.
     */
    cursor?: mstjabWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mstjabs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mstjabs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of mstjabs.
     */
    distinct?: MstjabScalarFieldEnum | MstjabScalarFieldEnum[]
  }

  /**
   * mstjab findMany
   */
  export type mstjabFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstjab
     */
    select?: mstjabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstjab
     */
    omit?: mstjabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstjabInclude<ExtArgs> | null
    /**
     * Filter, which mstjabs to fetch.
     */
    where?: mstjabWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mstjabs to fetch.
     */
    orderBy?: mstjabOrderByWithRelationInput | mstjabOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing mstjabs.
     */
    cursor?: mstjabWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mstjabs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mstjabs.
     */
    skip?: number
    distinct?: MstjabScalarFieldEnum | MstjabScalarFieldEnum[]
  }

  /**
   * mstjab create
   */
  export type mstjabCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstjab
     */
    select?: mstjabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstjab
     */
    omit?: mstjabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstjabInclude<ExtArgs> | null
    /**
     * The data needed to create a mstjab.
     */
    data: XOR<mstjabCreateInput, mstjabUncheckedCreateInput>
  }

  /**
   * mstjab createMany
   */
  export type mstjabCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many mstjabs.
     */
    data: mstjabCreateManyInput | mstjabCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * mstjab createManyAndReturn
   */
  export type mstjabCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstjab
     */
    select?: mstjabSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the mstjab
     */
    omit?: mstjabOmit<ExtArgs> | null
    /**
     * The data used to create many mstjabs.
     */
    data: mstjabCreateManyInput | mstjabCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * mstjab update
   */
  export type mstjabUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstjab
     */
    select?: mstjabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstjab
     */
    omit?: mstjabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstjabInclude<ExtArgs> | null
    /**
     * The data needed to update a mstjab.
     */
    data: XOR<mstjabUpdateInput, mstjabUncheckedUpdateInput>
    /**
     * Choose, which mstjab to update.
     */
    where: mstjabWhereUniqueInput
  }

  /**
   * mstjab updateMany
   */
  export type mstjabUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update mstjabs.
     */
    data: XOR<mstjabUpdateManyMutationInput, mstjabUncheckedUpdateManyInput>
    /**
     * Filter which mstjabs to update
     */
    where?: mstjabWhereInput
    /**
     * Limit how many mstjabs to update.
     */
    limit?: number
  }

  /**
   * mstjab updateManyAndReturn
   */
  export type mstjabUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstjab
     */
    select?: mstjabSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the mstjab
     */
    omit?: mstjabOmit<ExtArgs> | null
    /**
     * The data used to update mstjabs.
     */
    data: XOR<mstjabUpdateManyMutationInput, mstjabUncheckedUpdateManyInput>
    /**
     * Filter which mstjabs to update
     */
    where?: mstjabWhereInput
    /**
     * Limit how many mstjabs to update.
     */
    limit?: number
  }

  /**
   * mstjab upsert
   */
  export type mstjabUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstjab
     */
    select?: mstjabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstjab
     */
    omit?: mstjabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstjabInclude<ExtArgs> | null
    /**
     * The filter to search for the mstjab to update in case it exists.
     */
    where: mstjabWhereUniqueInput
    /**
     * In case the mstjab found by the `where` argument doesn't exist, create a new mstjab with this data.
     */
    create: XOR<mstjabCreateInput, mstjabUncheckedCreateInput>
    /**
     * In case the mstjab was found with the provided `where` argument, update it with this data.
     */
    update: XOR<mstjabUpdateInput, mstjabUncheckedUpdateInput>
  }

  /**
   * mstjab delete
   */
  export type mstjabDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstjab
     */
    select?: mstjabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstjab
     */
    omit?: mstjabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstjabInclude<ExtArgs> | null
    /**
     * Filter which mstjab to delete.
     */
    where: mstjabWhereUniqueInput
  }

  /**
   * mstjab deleteMany
   */
  export type mstjabDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which mstjabs to delete
     */
    where?: mstjabWhereInput
    /**
     * Limit how many mstjabs to delete.
     */
    limit?: number
  }

  /**
   * mstjab.karyawan
   */
  export type mstjab$karyawanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the karyawan
     */
    select?: karyawanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the karyawan
     */
    omit?: karyawanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: karyawanInclude<ExtArgs> | null
    where?: karyawanWhereInput
    orderBy?: karyawanOrderByWithRelationInput | karyawanOrderByWithRelationInput[]
    cursor?: karyawanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KaryawanScalarFieldEnum | KaryawanScalarFieldEnum[]
  }

  /**
   * mstjab without action
   */
  export type mstjabDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstjab
     */
    select?: mstjabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstjab
     */
    omit?: mstjabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstjabInclude<ExtArgs> | null
  }


  /**
   * Model mstbag
   */

  export type AggregateMstbag = {
    _count: MstbagCountAggregateOutputType | null
    _min: MstbagMinAggregateOutputType | null
    _max: MstbagMaxAggregateOutputType | null
  }

  export type MstbagMinAggregateOutputType = {
    id: string | null
    CKD_BAG: string | null
    CNM_BAG: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type MstbagMaxAggregateOutputType = {
    id: string | null
    CKD_BAG: string | null
    CNM_BAG: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type MstbagCountAggregateOutputType = {
    id: number
    CKD_BAG: number
    CNM_BAG: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type MstbagMinAggregateInputType = {
    id?: true
    CKD_BAG?: true
    CNM_BAG?: true
    created_at?: true
    updated_at?: true
  }

  export type MstbagMaxAggregateInputType = {
    id?: true
    CKD_BAG?: true
    CNM_BAG?: true
    created_at?: true
    updated_at?: true
  }

  export type MstbagCountAggregateInputType = {
    id?: true
    CKD_BAG?: true
    CNM_BAG?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type MstbagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which mstbag to aggregate.
     */
    where?: mstbagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mstbags to fetch.
     */
    orderBy?: mstbagOrderByWithRelationInput | mstbagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: mstbagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mstbags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mstbags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned mstbags
    **/
    _count?: true | MstbagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MstbagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MstbagMaxAggregateInputType
  }

  export type GetMstbagAggregateType<T extends MstbagAggregateArgs> = {
        [P in keyof T & keyof AggregateMstbag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMstbag[P]>
      : GetScalarType<T[P], AggregateMstbag[P]>
  }




  export type mstbagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: mstbagWhereInput
    orderBy?: mstbagOrderByWithAggregationInput | mstbagOrderByWithAggregationInput[]
    by: MstbagScalarFieldEnum[] | MstbagScalarFieldEnum
    having?: mstbagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MstbagCountAggregateInputType | true
    _min?: MstbagMinAggregateInputType
    _max?: MstbagMaxAggregateInputType
  }

  export type MstbagGroupByOutputType = {
    id: string
    CKD_BAG: string
    CNM_BAG: string | null
    created_at: Date
    updated_at: Date
    _count: MstbagCountAggregateOutputType | null
    _min: MstbagMinAggregateOutputType | null
    _max: MstbagMaxAggregateOutputType | null
  }

  type GetMstbagGroupByPayload<T extends mstbagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MstbagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MstbagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MstbagGroupByOutputType[P]>
            : GetScalarType<T[P], MstbagGroupByOutputType[P]>
        }
      >
    >


  export type mstbagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    CKD_BAG?: boolean
    CNM_BAG?: boolean
    created_at?: boolean
    updated_at?: boolean
    karyawan?: boolean | mstbag$karyawanArgs<ExtArgs>
    _count?: boolean | MstbagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mstbag"]>

  export type mstbagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    CKD_BAG?: boolean
    CNM_BAG?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["mstbag"]>

  export type mstbagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    CKD_BAG?: boolean
    CNM_BAG?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["mstbag"]>

  export type mstbagSelectScalar = {
    id?: boolean
    CKD_BAG?: boolean
    CNM_BAG?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type mstbagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "CKD_BAG" | "CNM_BAG" | "created_at" | "updated_at", ExtArgs["result"]["mstbag"]>
  export type mstbagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    karyawan?: boolean | mstbag$karyawanArgs<ExtArgs>
    _count?: boolean | MstbagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type mstbagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type mstbagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $mstbagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "mstbag"
    objects: {
      karyawan: Prisma.$karyawanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      CKD_BAG: string
      CNM_BAG: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["mstbag"]>
    composites: {}
  }

  type mstbagGetPayload<S extends boolean | null | undefined | mstbagDefaultArgs> = $Result.GetResult<Prisma.$mstbagPayload, S>

  type mstbagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<mstbagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MstbagCountAggregateInputType | true
    }

  export interface mstbagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['mstbag'], meta: { name: 'mstbag' } }
    /**
     * Find zero or one Mstbag that matches the filter.
     * @param {mstbagFindUniqueArgs} args - Arguments to find a Mstbag
     * @example
     * // Get one Mstbag
     * const mstbag = await prisma.mstbag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends mstbagFindUniqueArgs>(args: SelectSubset<T, mstbagFindUniqueArgs<ExtArgs>>): Prisma__mstbagClient<$Result.GetResult<Prisma.$mstbagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mstbag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {mstbagFindUniqueOrThrowArgs} args - Arguments to find a Mstbag
     * @example
     * // Get one Mstbag
     * const mstbag = await prisma.mstbag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends mstbagFindUniqueOrThrowArgs>(args: SelectSubset<T, mstbagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__mstbagClient<$Result.GetResult<Prisma.$mstbagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mstbag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mstbagFindFirstArgs} args - Arguments to find a Mstbag
     * @example
     * // Get one Mstbag
     * const mstbag = await prisma.mstbag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends mstbagFindFirstArgs>(args?: SelectSubset<T, mstbagFindFirstArgs<ExtArgs>>): Prisma__mstbagClient<$Result.GetResult<Prisma.$mstbagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mstbag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mstbagFindFirstOrThrowArgs} args - Arguments to find a Mstbag
     * @example
     * // Get one Mstbag
     * const mstbag = await prisma.mstbag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends mstbagFindFirstOrThrowArgs>(args?: SelectSubset<T, mstbagFindFirstOrThrowArgs<ExtArgs>>): Prisma__mstbagClient<$Result.GetResult<Prisma.$mstbagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mstbags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mstbagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mstbags
     * const mstbags = await prisma.mstbag.findMany()
     * 
     * // Get first 10 Mstbags
     * const mstbags = await prisma.mstbag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mstbagWithIdOnly = await prisma.mstbag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends mstbagFindManyArgs>(args?: SelectSubset<T, mstbagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mstbagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mstbag.
     * @param {mstbagCreateArgs} args - Arguments to create a Mstbag.
     * @example
     * // Create one Mstbag
     * const Mstbag = await prisma.mstbag.create({
     *   data: {
     *     // ... data to create a Mstbag
     *   }
     * })
     * 
     */
    create<T extends mstbagCreateArgs>(args: SelectSubset<T, mstbagCreateArgs<ExtArgs>>): Prisma__mstbagClient<$Result.GetResult<Prisma.$mstbagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mstbags.
     * @param {mstbagCreateManyArgs} args - Arguments to create many Mstbags.
     * @example
     * // Create many Mstbags
     * const mstbag = await prisma.mstbag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends mstbagCreateManyArgs>(args?: SelectSubset<T, mstbagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Mstbags and returns the data saved in the database.
     * @param {mstbagCreateManyAndReturnArgs} args - Arguments to create many Mstbags.
     * @example
     * // Create many Mstbags
     * const mstbag = await prisma.mstbag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Mstbags and only return the `id`
     * const mstbagWithIdOnly = await prisma.mstbag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends mstbagCreateManyAndReturnArgs>(args?: SelectSubset<T, mstbagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mstbagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mstbag.
     * @param {mstbagDeleteArgs} args - Arguments to delete one Mstbag.
     * @example
     * // Delete one Mstbag
     * const Mstbag = await prisma.mstbag.delete({
     *   where: {
     *     // ... filter to delete one Mstbag
     *   }
     * })
     * 
     */
    delete<T extends mstbagDeleteArgs>(args: SelectSubset<T, mstbagDeleteArgs<ExtArgs>>): Prisma__mstbagClient<$Result.GetResult<Prisma.$mstbagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mstbag.
     * @param {mstbagUpdateArgs} args - Arguments to update one Mstbag.
     * @example
     * // Update one Mstbag
     * const mstbag = await prisma.mstbag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends mstbagUpdateArgs>(args: SelectSubset<T, mstbagUpdateArgs<ExtArgs>>): Prisma__mstbagClient<$Result.GetResult<Prisma.$mstbagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mstbags.
     * @param {mstbagDeleteManyArgs} args - Arguments to filter Mstbags to delete.
     * @example
     * // Delete a few Mstbags
     * const { count } = await prisma.mstbag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends mstbagDeleteManyArgs>(args?: SelectSubset<T, mstbagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mstbags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mstbagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mstbags
     * const mstbag = await prisma.mstbag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends mstbagUpdateManyArgs>(args: SelectSubset<T, mstbagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mstbags and returns the data updated in the database.
     * @param {mstbagUpdateManyAndReturnArgs} args - Arguments to update many Mstbags.
     * @example
     * // Update many Mstbags
     * const mstbag = await prisma.mstbag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Mstbags and only return the `id`
     * const mstbagWithIdOnly = await prisma.mstbag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends mstbagUpdateManyAndReturnArgs>(args: SelectSubset<T, mstbagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mstbagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mstbag.
     * @param {mstbagUpsertArgs} args - Arguments to update or create a Mstbag.
     * @example
     * // Update or create a Mstbag
     * const mstbag = await prisma.mstbag.upsert({
     *   create: {
     *     // ... data to create a Mstbag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mstbag we want to update
     *   }
     * })
     */
    upsert<T extends mstbagUpsertArgs>(args: SelectSubset<T, mstbagUpsertArgs<ExtArgs>>): Prisma__mstbagClient<$Result.GetResult<Prisma.$mstbagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Mstbags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mstbagCountArgs} args - Arguments to filter Mstbags to count.
     * @example
     * // Count the number of Mstbags
     * const count = await prisma.mstbag.count({
     *   where: {
     *     // ... the filter for the Mstbags we want to count
     *   }
     * })
    **/
    count<T extends mstbagCountArgs>(
      args?: Subset<T, mstbagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MstbagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mstbag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MstbagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MstbagAggregateArgs>(args: Subset<T, MstbagAggregateArgs>): Prisma.PrismaPromise<GetMstbagAggregateType<T>>

    /**
     * Group by Mstbag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mstbagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends mstbagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: mstbagGroupByArgs['orderBy'] }
        : { orderBy?: mstbagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, mstbagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMstbagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the mstbag model
   */
  readonly fields: mstbagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for mstbag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__mstbagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    karyawan<T extends mstbag$karyawanArgs<ExtArgs> = {}>(args?: Subset<T, mstbag$karyawanArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$karyawanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the mstbag model
   */
  interface mstbagFieldRefs {
    readonly id: FieldRef<"mstbag", 'String'>
    readonly CKD_BAG: FieldRef<"mstbag", 'String'>
    readonly CNM_BAG: FieldRef<"mstbag", 'String'>
    readonly created_at: FieldRef<"mstbag", 'DateTime'>
    readonly updated_at: FieldRef<"mstbag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * mstbag findUnique
   */
  export type mstbagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstbag
     */
    select?: mstbagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstbag
     */
    omit?: mstbagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstbagInclude<ExtArgs> | null
    /**
     * Filter, which mstbag to fetch.
     */
    where: mstbagWhereUniqueInput
  }

  /**
   * mstbag findUniqueOrThrow
   */
  export type mstbagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstbag
     */
    select?: mstbagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstbag
     */
    omit?: mstbagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstbagInclude<ExtArgs> | null
    /**
     * Filter, which mstbag to fetch.
     */
    where: mstbagWhereUniqueInput
  }

  /**
   * mstbag findFirst
   */
  export type mstbagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstbag
     */
    select?: mstbagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstbag
     */
    omit?: mstbagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstbagInclude<ExtArgs> | null
    /**
     * Filter, which mstbag to fetch.
     */
    where?: mstbagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mstbags to fetch.
     */
    orderBy?: mstbagOrderByWithRelationInput | mstbagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for mstbags.
     */
    cursor?: mstbagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mstbags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mstbags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of mstbags.
     */
    distinct?: MstbagScalarFieldEnum | MstbagScalarFieldEnum[]
  }

  /**
   * mstbag findFirstOrThrow
   */
  export type mstbagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstbag
     */
    select?: mstbagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstbag
     */
    omit?: mstbagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstbagInclude<ExtArgs> | null
    /**
     * Filter, which mstbag to fetch.
     */
    where?: mstbagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mstbags to fetch.
     */
    orderBy?: mstbagOrderByWithRelationInput | mstbagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for mstbags.
     */
    cursor?: mstbagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mstbags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mstbags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of mstbags.
     */
    distinct?: MstbagScalarFieldEnum | MstbagScalarFieldEnum[]
  }

  /**
   * mstbag findMany
   */
  export type mstbagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstbag
     */
    select?: mstbagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstbag
     */
    omit?: mstbagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstbagInclude<ExtArgs> | null
    /**
     * Filter, which mstbags to fetch.
     */
    where?: mstbagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mstbags to fetch.
     */
    orderBy?: mstbagOrderByWithRelationInput | mstbagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing mstbags.
     */
    cursor?: mstbagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mstbags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mstbags.
     */
    skip?: number
    distinct?: MstbagScalarFieldEnum | MstbagScalarFieldEnum[]
  }

  /**
   * mstbag create
   */
  export type mstbagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstbag
     */
    select?: mstbagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstbag
     */
    omit?: mstbagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstbagInclude<ExtArgs> | null
    /**
     * The data needed to create a mstbag.
     */
    data: XOR<mstbagCreateInput, mstbagUncheckedCreateInput>
  }

  /**
   * mstbag createMany
   */
  export type mstbagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many mstbags.
     */
    data: mstbagCreateManyInput | mstbagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * mstbag createManyAndReturn
   */
  export type mstbagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstbag
     */
    select?: mstbagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the mstbag
     */
    omit?: mstbagOmit<ExtArgs> | null
    /**
     * The data used to create many mstbags.
     */
    data: mstbagCreateManyInput | mstbagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * mstbag update
   */
  export type mstbagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstbag
     */
    select?: mstbagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstbag
     */
    omit?: mstbagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstbagInclude<ExtArgs> | null
    /**
     * The data needed to update a mstbag.
     */
    data: XOR<mstbagUpdateInput, mstbagUncheckedUpdateInput>
    /**
     * Choose, which mstbag to update.
     */
    where: mstbagWhereUniqueInput
  }

  /**
   * mstbag updateMany
   */
  export type mstbagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update mstbags.
     */
    data: XOR<mstbagUpdateManyMutationInput, mstbagUncheckedUpdateManyInput>
    /**
     * Filter which mstbags to update
     */
    where?: mstbagWhereInput
    /**
     * Limit how many mstbags to update.
     */
    limit?: number
  }

  /**
   * mstbag updateManyAndReturn
   */
  export type mstbagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstbag
     */
    select?: mstbagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the mstbag
     */
    omit?: mstbagOmit<ExtArgs> | null
    /**
     * The data used to update mstbags.
     */
    data: XOR<mstbagUpdateManyMutationInput, mstbagUncheckedUpdateManyInput>
    /**
     * Filter which mstbags to update
     */
    where?: mstbagWhereInput
    /**
     * Limit how many mstbags to update.
     */
    limit?: number
  }

  /**
   * mstbag upsert
   */
  export type mstbagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstbag
     */
    select?: mstbagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstbag
     */
    omit?: mstbagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstbagInclude<ExtArgs> | null
    /**
     * The filter to search for the mstbag to update in case it exists.
     */
    where: mstbagWhereUniqueInput
    /**
     * In case the mstbag found by the `where` argument doesn't exist, create a new mstbag with this data.
     */
    create: XOR<mstbagCreateInput, mstbagUncheckedCreateInput>
    /**
     * In case the mstbag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<mstbagUpdateInput, mstbagUncheckedUpdateInput>
  }

  /**
   * mstbag delete
   */
  export type mstbagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstbag
     */
    select?: mstbagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstbag
     */
    omit?: mstbagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstbagInclude<ExtArgs> | null
    /**
     * Filter which mstbag to delete.
     */
    where: mstbagWhereUniqueInput
  }

  /**
   * mstbag deleteMany
   */
  export type mstbagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which mstbags to delete
     */
    where?: mstbagWhereInput
    /**
     * Limit how many mstbags to delete.
     */
    limit?: number
  }

  /**
   * mstbag.karyawan
   */
  export type mstbag$karyawanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the karyawan
     */
    select?: karyawanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the karyawan
     */
    omit?: karyawanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: karyawanInclude<ExtArgs> | null
    where?: karyawanWhereInput
    orderBy?: karyawanOrderByWithRelationInput | karyawanOrderByWithRelationInput[]
    cursor?: karyawanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KaryawanScalarFieldEnum | KaryawanScalarFieldEnum[]
  }

  /**
   * mstbag without action
   */
  export type mstbagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mstbag
     */
    select?: mstbagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mstbag
     */
    omit?: mstbagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mstbagInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    access_token: 'access_token',
    refresh_token: 'refresh_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    image: 'image',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isActive: 'isActive',
    fcmToken: 'fcmToken'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    sessionToken: 'sessionToken',
    expires: 'expires',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    KODE_CMPY: 'KODE_CMPY',
    COMPANY: 'COMPANY',
    ADDRESS1: 'ADDRESS1',
    ADDRESS2: 'ADDRESS2',
    ADDRESS3: 'ADDRESS3',
    TLP: 'TLP',
    FAX: 'FAX',
    NPWP: 'NPWP',
    DIRECTOR: 'DIRECTOR',
    NPWPDIR: 'NPWPDIR',
    LOGO: 'LOGO',
    NPP: 'NPP',
    ASTEKBAYAR: 'ASTEKBAYAR',
    EMAIL: 'EMAIL',
    HOMEPAGE: 'HOMEPAGE',
    HRDMNG: 'HRDMNG',
    NPWPMNG: 'NPWPMNG',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const KaryawanScalarFieldEnum: {
    EMPL_ID: 'EMPL_ID',
    user_id: 'user_id',
    NIK: 'NIK',
    NAMA: 'NAMA',
    KD_CMPY: 'KD_CMPY',
    KD_FACT: 'KD_FACT',
    KD_BAG: 'KD_BAG',
    KD_DEPT: 'KD_DEPT',
    KD_SEKSIE: 'KD_SEKSIE',
    KD_PKT: 'KD_PKT',
    KD_JAB: 'KD_JAB',
    KD_AGM: 'KD_AGM',
    KD_SKL: 'KD_SKL',
    BANK_CODE: 'BANK_CODE',
    KD_SEX: 'KD_SEX',
    ALAMAT1: 'ALAMAT1',
    KOTA: 'KOTA',
    TELPON: 'TELPON',
    HANDPHONE: 'HANDPHONE',
    EMAIL: 'EMAIL',
    TGL_LHR: 'TGL_LHR',
    TGL_MSK: 'TGL_MSK',
    TGL_OUT: 'TGL_OUT',
    ALASAN_OUT: 'ALASAN_OUT',
    KD_OUT: 'KD_OUT',
    KD_JNS: 'KD_JNS',
    KD_STS: 'KD_STS',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type KaryawanScalarFieldEnum = (typeof KaryawanScalarFieldEnum)[keyof typeof KaryawanScalarFieldEnum]


  export const MstdeptScalarFieldEnum: {
    id: 'id',
    CKD_DEPT: 'CKD_DEPT',
    CNM_DEPT: 'CNM_DEPT',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type MstdeptScalarFieldEnum = (typeof MstdeptScalarFieldEnum)[keyof typeof MstdeptScalarFieldEnum]


  export const MstjabScalarFieldEnum: {
    id: 'id',
    CKD_JAB: 'CKD_JAB',
    CNM_JAB: 'CNM_JAB',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type MstjabScalarFieldEnum = (typeof MstjabScalarFieldEnum)[keyof typeof MstjabScalarFieldEnum]


  export const MstbagScalarFieldEnum: {
    id: 'id',
    CKD_BAG: 'CKD_BAG',
    CNM_BAG: 'CNM_BAG',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type MstbagScalarFieldEnum = (typeof MstbagScalarFieldEnum)[keyof typeof MstbagScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'JenisKelamin'
   */
  export type EnumJenisKelaminFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JenisKelamin'>
    


  /**
   * Reference to a field of type 'JenisKelamin[]'
   */
  export type ListEnumJenisKelaminFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JenisKelamin[]'>
    


  /**
   * Reference to a field of type 'StatusKaryawan'
   */
  export type EnumStatusKaryawanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusKaryawan'>
    


  /**
   * Reference to a field of type 'StatusKaryawan[]'
   */
  export type ListEnumStatusKaryawanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusKaryawan[]'>
    


  /**
   * Reference to a field of type 'StatusAktif'
   */
  export type EnumStatusAktifFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusAktif'>
    


  /**
   * Reference to a field of type 'StatusAktif[]'
   */
  export type ListEnumStatusAktifFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusAktif[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    access_token?: StringNullableFilter<"Account"> | string | null
    refresh_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    type?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    access_token?: SortOrderInput | SortOrder
    refresh_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    User?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    access_token?: StringNullableFilter<"Account"> | string | null
    refresh_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    type?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    access_token?: SortOrderInput | SortOrder
    refresh_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
    type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    isActive?: BoolFilter<"User"> | boolean
    fcmToken?: StringNullableFilter<"User"> | string | null
    Account?: AccountListRelationFilter
    Session?: SessionListRelationFilter
    karyawan?: XOR<KaryawanNullableScalarRelationFilter, karyawanWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    fcmToken?: SortOrderInput | SortOrder
    Account?: AccountOrderByRelationAggregateInput
    Session?: SessionOrderByRelationAggregateInput
    karyawan?: karyawanOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    isActive?: BoolFilter<"User"> | boolean
    fcmToken?: StringNullableFilter<"User"> | string | null
    Account?: AccountListRelationFilter
    Session?: SessionListRelationFilter
    karyawan?: XOR<KaryawanNullableScalarRelationFilter, karyawanWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    fcmToken?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    fcmToken?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionToken?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    User?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionToken?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type companyWhereInput = {
    AND?: companyWhereInput | companyWhereInput[]
    OR?: companyWhereInput[]
    NOT?: companyWhereInput | companyWhereInput[]
    id?: UuidFilter<"company"> | string
    KODE_CMPY?: StringFilter<"company"> | string
    COMPANY?: StringNullableFilter<"company"> | string | null
    ADDRESS1?: StringNullableFilter<"company"> | string | null
    ADDRESS2?: StringNullableFilter<"company"> | string | null
    ADDRESS3?: StringNullableFilter<"company"> | string | null
    TLP?: StringNullableFilter<"company"> | string | null
    FAX?: StringNullableFilter<"company"> | string | null
    NPWP?: StringNullableFilter<"company"> | string | null
    DIRECTOR?: StringNullableFilter<"company"> | string | null
    NPWPDIR?: StringNullableFilter<"company"> | string | null
    LOGO?: StringNullableFilter<"company"> | string | null
    NPP?: StringNullableFilter<"company"> | string | null
    ASTEKBAYAR?: StringNullableFilter<"company"> | string | null
    EMAIL?: StringNullableFilter<"company"> | string | null
    HOMEPAGE?: StringNullableFilter<"company"> | string | null
    HRDMNG?: StringNullableFilter<"company"> | string | null
    NPWPMNG?: StringNullableFilter<"company"> | string | null
    created_at?: DateTimeFilter<"company"> | Date | string
    updated_at?: DateTimeFilter<"company"> | Date | string
    karyawan?: KaryawanListRelationFilter
  }

  export type companyOrderByWithRelationInput = {
    id?: SortOrder
    KODE_CMPY?: SortOrder
    COMPANY?: SortOrderInput | SortOrder
    ADDRESS1?: SortOrderInput | SortOrder
    ADDRESS2?: SortOrderInput | SortOrder
    ADDRESS3?: SortOrderInput | SortOrder
    TLP?: SortOrderInput | SortOrder
    FAX?: SortOrderInput | SortOrder
    NPWP?: SortOrderInput | SortOrder
    DIRECTOR?: SortOrderInput | SortOrder
    NPWPDIR?: SortOrderInput | SortOrder
    LOGO?: SortOrderInput | SortOrder
    NPP?: SortOrderInput | SortOrder
    ASTEKBAYAR?: SortOrderInput | SortOrder
    EMAIL?: SortOrderInput | SortOrder
    HOMEPAGE?: SortOrderInput | SortOrder
    HRDMNG?: SortOrderInput | SortOrder
    NPWPMNG?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    karyawan?: karyawanOrderByRelationAggregateInput
  }

  export type companyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    KODE_CMPY?: string
    AND?: companyWhereInput | companyWhereInput[]
    OR?: companyWhereInput[]
    NOT?: companyWhereInput | companyWhereInput[]
    COMPANY?: StringNullableFilter<"company"> | string | null
    ADDRESS1?: StringNullableFilter<"company"> | string | null
    ADDRESS2?: StringNullableFilter<"company"> | string | null
    ADDRESS3?: StringNullableFilter<"company"> | string | null
    TLP?: StringNullableFilter<"company"> | string | null
    FAX?: StringNullableFilter<"company"> | string | null
    NPWP?: StringNullableFilter<"company"> | string | null
    DIRECTOR?: StringNullableFilter<"company"> | string | null
    NPWPDIR?: StringNullableFilter<"company"> | string | null
    LOGO?: StringNullableFilter<"company"> | string | null
    NPP?: StringNullableFilter<"company"> | string | null
    ASTEKBAYAR?: StringNullableFilter<"company"> | string | null
    EMAIL?: StringNullableFilter<"company"> | string | null
    HOMEPAGE?: StringNullableFilter<"company"> | string | null
    HRDMNG?: StringNullableFilter<"company"> | string | null
    NPWPMNG?: StringNullableFilter<"company"> | string | null
    created_at?: DateTimeFilter<"company"> | Date | string
    updated_at?: DateTimeFilter<"company"> | Date | string
    karyawan?: KaryawanListRelationFilter
  }, "id" | "KODE_CMPY">

  export type companyOrderByWithAggregationInput = {
    id?: SortOrder
    KODE_CMPY?: SortOrder
    COMPANY?: SortOrderInput | SortOrder
    ADDRESS1?: SortOrderInput | SortOrder
    ADDRESS2?: SortOrderInput | SortOrder
    ADDRESS3?: SortOrderInput | SortOrder
    TLP?: SortOrderInput | SortOrder
    FAX?: SortOrderInput | SortOrder
    NPWP?: SortOrderInput | SortOrder
    DIRECTOR?: SortOrderInput | SortOrder
    NPWPDIR?: SortOrderInput | SortOrder
    LOGO?: SortOrderInput | SortOrder
    NPP?: SortOrderInput | SortOrder
    ASTEKBAYAR?: SortOrderInput | SortOrder
    EMAIL?: SortOrderInput | SortOrder
    HOMEPAGE?: SortOrderInput | SortOrder
    HRDMNG?: SortOrderInput | SortOrder
    NPWPMNG?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: companyCountOrderByAggregateInput
    _max?: companyMaxOrderByAggregateInput
    _min?: companyMinOrderByAggregateInput
  }

  export type companyScalarWhereWithAggregatesInput = {
    AND?: companyScalarWhereWithAggregatesInput | companyScalarWhereWithAggregatesInput[]
    OR?: companyScalarWhereWithAggregatesInput[]
    NOT?: companyScalarWhereWithAggregatesInput | companyScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"company"> | string
    KODE_CMPY?: StringWithAggregatesFilter<"company"> | string
    COMPANY?: StringNullableWithAggregatesFilter<"company"> | string | null
    ADDRESS1?: StringNullableWithAggregatesFilter<"company"> | string | null
    ADDRESS2?: StringNullableWithAggregatesFilter<"company"> | string | null
    ADDRESS3?: StringNullableWithAggregatesFilter<"company"> | string | null
    TLP?: StringNullableWithAggregatesFilter<"company"> | string | null
    FAX?: StringNullableWithAggregatesFilter<"company"> | string | null
    NPWP?: StringNullableWithAggregatesFilter<"company"> | string | null
    DIRECTOR?: StringNullableWithAggregatesFilter<"company"> | string | null
    NPWPDIR?: StringNullableWithAggregatesFilter<"company"> | string | null
    LOGO?: StringNullableWithAggregatesFilter<"company"> | string | null
    NPP?: StringNullableWithAggregatesFilter<"company"> | string | null
    ASTEKBAYAR?: StringNullableWithAggregatesFilter<"company"> | string | null
    EMAIL?: StringNullableWithAggregatesFilter<"company"> | string | null
    HOMEPAGE?: StringNullableWithAggregatesFilter<"company"> | string | null
    HRDMNG?: StringNullableWithAggregatesFilter<"company"> | string | null
    NPWPMNG?: StringNullableWithAggregatesFilter<"company"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"company"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"company"> | Date | string
  }

  export type karyawanWhereInput = {
    AND?: karyawanWhereInput | karyawanWhereInput[]
    OR?: karyawanWhereInput[]
    NOT?: karyawanWhereInput | karyawanWhereInput[]
    EMPL_ID?: StringFilter<"karyawan"> | string
    user_id?: StringNullableFilter<"karyawan"> | string | null
    NIK?: StringNullableFilter<"karyawan"> | string | null
    NAMA?: StringNullableFilter<"karyawan"> | string | null
    KD_CMPY?: StringNullableFilter<"karyawan"> | string | null
    KD_FACT?: StringNullableFilter<"karyawan"> | string | null
    KD_BAG?: StringNullableFilter<"karyawan"> | string | null
    KD_DEPT?: StringNullableFilter<"karyawan"> | string | null
    KD_SEKSIE?: StringNullableFilter<"karyawan"> | string | null
    KD_PKT?: StringNullableFilter<"karyawan"> | string | null
    KD_JAB?: StringNullableFilter<"karyawan"> | string | null
    KD_AGM?: StringNullableFilter<"karyawan"> | string | null
    KD_SKL?: StringNullableFilter<"karyawan"> | string | null
    BANK_CODE?: StringNullableFilter<"karyawan"> | string | null
    KD_SEX?: EnumJenisKelaminNullableFilter<"karyawan"> | $Enums.JenisKelamin | null
    ALAMAT1?: StringNullableFilter<"karyawan"> | string | null
    KOTA?: StringNullableFilter<"karyawan"> | string | null
    TELPON?: StringNullableFilter<"karyawan"> | string | null
    HANDPHONE?: StringNullableFilter<"karyawan"> | string | null
    EMAIL?: StringNullableFilter<"karyawan"> | string | null
    TGL_LHR?: DateTimeNullableFilter<"karyawan"> | Date | string | null
    TGL_MSK?: DateTimeNullableFilter<"karyawan"> | Date | string | null
    TGL_OUT?: DateTimeNullableFilter<"karyawan"> | Date | string | null
    ALASAN_OUT?: StringNullableFilter<"karyawan"> | string | null
    KD_OUT?: BoolNullableFilter<"karyawan"> | boolean | null
    KD_JNS?: EnumStatusKaryawanNullableFilter<"karyawan"> | $Enums.StatusKaryawan | null
    KD_STS?: EnumStatusAktifNullableFilter<"karyawan"> | $Enums.StatusAktif | null
    created_at?: DateTimeFilter<"karyawan"> | Date | string
    updated_at?: DateTimeFilter<"karyawan"> | Date | string
    company?: XOR<CompanyNullableScalarRelationFilter, companyWhereInput> | null
    mstdept?: XOR<MstdeptNullableScalarRelationFilter, mstdeptWhereInput> | null
    mstjab?: XOR<MstjabNullableScalarRelationFilter, mstjabWhereInput> | null
    mstbag?: XOR<MstbagNullableScalarRelationFilter, mstbagWhereInput> | null
    User?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type karyawanOrderByWithRelationInput = {
    EMPL_ID?: SortOrder
    user_id?: SortOrderInput | SortOrder
    NIK?: SortOrderInput | SortOrder
    NAMA?: SortOrderInput | SortOrder
    KD_CMPY?: SortOrderInput | SortOrder
    KD_FACT?: SortOrderInput | SortOrder
    KD_BAG?: SortOrderInput | SortOrder
    KD_DEPT?: SortOrderInput | SortOrder
    KD_SEKSIE?: SortOrderInput | SortOrder
    KD_PKT?: SortOrderInput | SortOrder
    KD_JAB?: SortOrderInput | SortOrder
    KD_AGM?: SortOrderInput | SortOrder
    KD_SKL?: SortOrderInput | SortOrder
    BANK_CODE?: SortOrderInput | SortOrder
    KD_SEX?: SortOrderInput | SortOrder
    ALAMAT1?: SortOrderInput | SortOrder
    KOTA?: SortOrderInput | SortOrder
    TELPON?: SortOrderInput | SortOrder
    HANDPHONE?: SortOrderInput | SortOrder
    EMAIL?: SortOrderInput | SortOrder
    TGL_LHR?: SortOrderInput | SortOrder
    TGL_MSK?: SortOrderInput | SortOrder
    TGL_OUT?: SortOrderInput | SortOrder
    ALASAN_OUT?: SortOrderInput | SortOrder
    KD_OUT?: SortOrderInput | SortOrder
    KD_JNS?: SortOrderInput | SortOrder
    KD_STS?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    company?: companyOrderByWithRelationInput
    mstdept?: mstdeptOrderByWithRelationInput
    mstjab?: mstjabOrderByWithRelationInput
    mstbag?: mstbagOrderByWithRelationInput
    User?: UserOrderByWithRelationInput
  }

  export type karyawanWhereUniqueInput = Prisma.AtLeast<{
    EMPL_ID?: string
    user_id?: string
    NIK?: string
    AND?: karyawanWhereInput | karyawanWhereInput[]
    OR?: karyawanWhereInput[]
    NOT?: karyawanWhereInput | karyawanWhereInput[]
    NAMA?: StringNullableFilter<"karyawan"> | string | null
    KD_CMPY?: StringNullableFilter<"karyawan"> | string | null
    KD_FACT?: StringNullableFilter<"karyawan"> | string | null
    KD_BAG?: StringNullableFilter<"karyawan"> | string | null
    KD_DEPT?: StringNullableFilter<"karyawan"> | string | null
    KD_SEKSIE?: StringNullableFilter<"karyawan"> | string | null
    KD_PKT?: StringNullableFilter<"karyawan"> | string | null
    KD_JAB?: StringNullableFilter<"karyawan"> | string | null
    KD_AGM?: StringNullableFilter<"karyawan"> | string | null
    KD_SKL?: StringNullableFilter<"karyawan"> | string | null
    BANK_CODE?: StringNullableFilter<"karyawan"> | string | null
    KD_SEX?: EnumJenisKelaminNullableFilter<"karyawan"> | $Enums.JenisKelamin | null
    ALAMAT1?: StringNullableFilter<"karyawan"> | string | null
    KOTA?: StringNullableFilter<"karyawan"> | string | null
    TELPON?: StringNullableFilter<"karyawan"> | string | null
    HANDPHONE?: StringNullableFilter<"karyawan"> | string | null
    EMAIL?: StringNullableFilter<"karyawan"> | string | null
    TGL_LHR?: DateTimeNullableFilter<"karyawan"> | Date | string | null
    TGL_MSK?: DateTimeNullableFilter<"karyawan"> | Date | string | null
    TGL_OUT?: DateTimeNullableFilter<"karyawan"> | Date | string | null
    ALASAN_OUT?: StringNullableFilter<"karyawan"> | string | null
    KD_OUT?: BoolNullableFilter<"karyawan"> | boolean | null
    KD_JNS?: EnumStatusKaryawanNullableFilter<"karyawan"> | $Enums.StatusKaryawan | null
    KD_STS?: EnumStatusAktifNullableFilter<"karyawan"> | $Enums.StatusAktif | null
    created_at?: DateTimeFilter<"karyawan"> | Date | string
    updated_at?: DateTimeFilter<"karyawan"> | Date | string
    company?: XOR<CompanyNullableScalarRelationFilter, companyWhereInput> | null
    mstdept?: XOR<MstdeptNullableScalarRelationFilter, mstdeptWhereInput> | null
    mstjab?: XOR<MstjabNullableScalarRelationFilter, mstjabWhereInput> | null
    mstbag?: XOR<MstbagNullableScalarRelationFilter, mstbagWhereInput> | null
    User?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "EMPL_ID" | "user_id" | "NIK">

  export type karyawanOrderByWithAggregationInput = {
    EMPL_ID?: SortOrder
    user_id?: SortOrderInput | SortOrder
    NIK?: SortOrderInput | SortOrder
    NAMA?: SortOrderInput | SortOrder
    KD_CMPY?: SortOrderInput | SortOrder
    KD_FACT?: SortOrderInput | SortOrder
    KD_BAG?: SortOrderInput | SortOrder
    KD_DEPT?: SortOrderInput | SortOrder
    KD_SEKSIE?: SortOrderInput | SortOrder
    KD_PKT?: SortOrderInput | SortOrder
    KD_JAB?: SortOrderInput | SortOrder
    KD_AGM?: SortOrderInput | SortOrder
    KD_SKL?: SortOrderInput | SortOrder
    BANK_CODE?: SortOrderInput | SortOrder
    KD_SEX?: SortOrderInput | SortOrder
    ALAMAT1?: SortOrderInput | SortOrder
    KOTA?: SortOrderInput | SortOrder
    TELPON?: SortOrderInput | SortOrder
    HANDPHONE?: SortOrderInput | SortOrder
    EMAIL?: SortOrderInput | SortOrder
    TGL_LHR?: SortOrderInput | SortOrder
    TGL_MSK?: SortOrderInput | SortOrder
    TGL_OUT?: SortOrderInput | SortOrder
    ALASAN_OUT?: SortOrderInput | SortOrder
    KD_OUT?: SortOrderInput | SortOrder
    KD_JNS?: SortOrderInput | SortOrder
    KD_STS?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: karyawanCountOrderByAggregateInput
    _max?: karyawanMaxOrderByAggregateInput
    _min?: karyawanMinOrderByAggregateInput
  }

  export type karyawanScalarWhereWithAggregatesInput = {
    AND?: karyawanScalarWhereWithAggregatesInput | karyawanScalarWhereWithAggregatesInput[]
    OR?: karyawanScalarWhereWithAggregatesInput[]
    NOT?: karyawanScalarWhereWithAggregatesInput | karyawanScalarWhereWithAggregatesInput[]
    EMPL_ID?: StringWithAggregatesFilter<"karyawan"> | string
    user_id?: StringNullableWithAggregatesFilter<"karyawan"> | string | null
    NIK?: StringNullableWithAggregatesFilter<"karyawan"> | string | null
    NAMA?: StringNullableWithAggregatesFilter<"karyawan"> | string | null
    KD_CMPY?: StringNullableWithAggregatesFilter<"karyawan"> | string | null
    KD_FACT?: StringNullableWithAggregatesFilter<"karyawan"> | string | null
    KD_BAG?: StringNullableWithAggregatesFilter<"karyawan"> | string | null
    KD_DEPT?: StringNullableWithAggregatesFilter<"karyawan"> | string | null
    KD_SEKSIE?: StringNullableWithAggregatesFilter<"karyawan"> | string | null
    KD_PKT?: StringNullableWithAggregatesFilter<"karyawan"> | string | null
    KD_JAB?: StringNullableWithAggregatesFilter<"karyawan"> | string | null
    KD_AGM?: StringNullableWithAggregatesFilter<"karyawan"> | string | null
    KD_SKL?: StringNullableWithAggregatesFilter<"karyawan"> | string | null
    BANK_CODE?: StringNullableWithAggregatesFilter<"karyawan"> | string | null
    KD_SEX?: EnumJenisKelaminNullableWithAggregatesFilter<"karyawan"> | $Enums.JenisKelamin | null
    ALAMAT1?: StringNullableWithAggregatesFilter<"karyawan"> | string | null
    KOTA?: StringNullableWithAggregatesFilter<"karyawan"> | string | null
    TELPON?: StringNullableWithAggregatesFilter<"karyawan"> | string | null
    HANDPHONE?: StringNullableWithAggregatesFilter<"karyawan"> | string | null
    EMAIL?: StringNullableWithAggregatesFilter<"karyawan"> | string | null
    TGL_LHR?: DateTimeNullableWithAggregatesFilter<"karyawan"> | Date | string | null
    TGL_MSK?: DateTimeNullableWithAggregatesFilter<"karyawan"> | Date | string | null
    TGL_OUT?: DateTimeNullableWithAggregatesFilter<"karyawan"> | Date | string | null
    ALASAN_OUT?: StringNullableWithAggregatesFilter<"karyawan"> | string | null
    KD_OUT?: BoolNullableWithAggregatesFilter<"karyawan"> | boolean | null
    KD_JNS?: EnumStatusKaryawanNullableWithAggregatesFilter<"karyawan"> | $Enums.StatusKaryawan | null
    KD_STS?: EnumStatusAktifNullableWithAggregatesFilter<"karyawan"> | $Enums.StatusAktif | null
    created_at?: DateTimeWithAggregatesFilter<"karyawan"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"karyawan"> | Date | string
  }

  export type mstdeptWhereInput = {
    AND?: mstdeptWhereInput | mstdeptWhereInput[]
    OR?: mstdeptWhereInput[]
    NOT?: mstdeptWhereInput | mstdeptWhereInput[]
    id?: UuidFilter<"mstdept"> | string
    CKD_DEPT?: StringFilter<"mstdept"> | string
    CNM_DEPT?: StringNullableFilter<"mstdept"> | string | null
    created_at?: DateTimeFilter<"mstdept"> | Date | string
    updated_at?: DateTimeFilter<"mstdept"> | Date | string
    karyawan?: KaryawanListRelationFilter
  }

  export type mstdeptOrderByWithRelationInput = {
    id?: SortOrder
    CKD_DEPT?: SortOrder
    CNM_DEPT?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    karyawan?: karyawanOrderByRelationAggregateInput
  }

  export type mstdeptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    CKD_DEPT?: string
    AND?: mstdeptWhereInput | mstdeptWhereInput[]
    OR?: mstdeptWhereInput[]
    NOT?: mstdeptWhereInput | mstdeptWhereInput[]
    CNM_DEPT?: StringNullableFilter<"mstdept"> | string | null
    created_at?: DateTimeFilter<"mstdept"> | Date | string
    updated_at?: DateTimeFilter<"mstdept"> | Date | string
    karyawan?: KaryawanListRelationFilter
  }, "id" | "CKD_DEPT">

  export type mstdeptOrderByWithAggregationInput = {
    id?: SortOrder
    CKD_DEPT?: SortOrder
    CNM_DEPT?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: mstdeptCountOrderByAggregateInput
    _max?: mstdeptMaxOrderByAggregateInput
    _min?: mstdeptMinOrderByAggregateInput
  }

  export type mstdeptScalarWhereWithAggregatesInput = {
    AND?: mstdeptScalarWhereWithAggregatesInput | mstdeptScalarWhereWithAggregatesInput[]
    OR?: mstdeptScalarWhereWithAggregatesInput[]
    NOT?: mstdeptScalarWhereWithAggregatesInput | mstdeptScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"mstdept"> | string
    CKD_DEPT?: StringWithAggregatesFilter<"mstdept"> | string
    CNM_DEPT?: StringNullableWithAggregatesFilter<"mstdept"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"mstdept"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"mstdept"> | Date | string
  }

  export type mstjabWhereInput = {
    AND?: mstjabWhereInput | mstjabWhereInput[]
    OR?: mstjabWhereInput[]
    NOT?: mstjabWhereInput | mstjabWhereInput[]
    id?: UuidFilter<"mstjab"> | string
    CKD_JAB?: StringFilter<"mstjab"> | string
    CNM_JAB?: StringNullableFilter<"mstjab"> | string | null
    created_at?: DateTimeFilter<"mstjab"> | Date | string
    updated_at?: DateTimeFilter<"mstjab"> | Date | string
    karyawan?: KaryawanListRelationFilter
  }

  export type mstjabOrderByWithRelationInput = {
    id?: SortOrder
    CKD_JAB?: SortOrder
    CNM_JAB?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    karyawan?: karyawanOrderByRelationAggregateInput
  }

  export type mstjabWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    CKD_JAB?: string
    AND?: mstjabWhereInput | mstjabWhereInput[]
    OR?: mstjabWhereInput[]
    NOT?: mstjabWhereInput | mstjabWhereInput[]
    CNM_JAB?: StringNullableFilter<"mstjab"> | string | null
    created_at?: DateTimeFilter<"mstjab"> | Date | string
    updated_at?: DateTimeFilter<"mstjab"> | Date | string
    karyawan?: KaryawanListRelationFilter
  }, "id" | "CKD_JAB">

  export type mstjabOrderByWithAggregationInput = {
    id?: SortOrder
    CKD_JAB?: SortOrder
    CNM_JAB?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: mstjabCountOrderByAggregateInput
    _max?: mstjabMaxOrderByAggregateInput
    _min?: mstjabMinOrderByAggregateInput
  }

  export type mstjabScalarWhereWithAggregatesInput = {
    AND?: mstjabScalarWhereWithAggregatesInput | mstjabScalarWhereWithAggregatesInput[]
    OR?: mstjabScalarWhereWithAggregatesInput[]
    NOT?: mstjabScalarWhereWithAggregatesInput | mstjabScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"mstjab"> | string
    CKD_JAB?: StringWithAggregatesFilter<"mstjab"> | string
    CNM_JAB?: StringNullableWithAggregatesFilter<"mstjab"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"mstjab"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"mstjab"> | Date | string
  }

  export type mstbagWhereInput = {
    AND?: mstbagWhereInput | mstbagWhereInput[]
    OR?: mstbagWhereInput[]
    NOT?: mstbagWhereInput | mstbagWhereInput[]
    id?: UuidFilter<"mstbag"> | string
    CKD_BAG?: StringFilter<"mstbag"> | string
    CNM_BAG?: StringNullableFilter<"mstbag"> | string | null
    created_at?: DateTimeFilter<"mstbag"> | Date | string
    updated_at?: DateTimeFilter<"mstbag"> | Date | string
    karyawan?: KaryawanListRelationFilter
  }

  export type mstbagOrderByWithRelationInput = {
    id?: SortOrder
    CKD_BAG?: SortOrder
    CNM_BAG?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    karyawan?: karyawanOrderByRelationAggregateInput
  }

  export type mstbagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    CKD_BAG?: string
    AND?: mstbagWhereInput | mstbagWhereInput[]
    OR?: mstbagWhereInput[]
    NOT?: mstbagWhereInput | mstbagWhereInput[]
    CNM_BAG?: StringNullableFilter<"mstbag"> | string | null
    created_at?: DateTimeFilter<"mstbag"> | Date | string
    updated_at?: DateTimeFilter<"mstbag"> | Date | string
    karyawan?: KaryawanListRelationFilter
  }, "id" | "CKD_BAG">

  export type mstbagOrderByWithAggregationInput = {
    id?: SortOrder
    CKD_BAG?: SortOrder
    CNM_BAG?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: mstbagCountOrderByAggregateInput
    _max?: mstbagMaxOrderByAggregateInput
    _min?: mstbagMinOrderByAggregateInput
  }

  export type mstbagScalarWhereWithAggregatesInput = {
    AND?: mstbagScalarWhereWithAggregatesInput | mstbagScalarWhereWithAggregatesInput[]
    OR?: mstbagScalarWhereWithAggregatesInput[]
    NOT?: mstbagScalarWhereWithAggregatesInput | mstbagScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"mstbag"> | string
    CKD_BAG?: StringWithAggregatesFilter<"mstbag"> | string
    CNM_BAG?: StringNullableWithAggregatesFilter<"mstbag"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"mstbag"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"mstbag"> | Date | string
  }

  export type AccountCreateInput = {
    id: string
    provider: string
    providerAccountId: string
    access_token?: string | null
    refresh_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    type?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    User: UserCreateNestedOneWithoutAccountInput
  }

  export type AccountUncheckedCreateInput = {
    id: string
    userId: string
    provider: string
    providerAccountId: string
    access_token?: string | null
    refresh_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    type?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id: string
    userId: string
    provider: string
    providerAccountId: string
    access_token?: string | null
    refresh_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    type?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id: string
    email: string
    password?: string | null
    name?: string | null
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt: Date | string
    isActive?: boolean
    fcmToken?: string | null
    Account?: AccountCreateNestedManyWithoutUserInput
    Session?: SessionCreateNestedManyWithoutUserInput
    karyawan?: karyawanCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    email: string
    password?: string | null
    name?: string | null
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt: Date | string
    isActive?: boolean
    fcmToken?: string | null
    Account?: AccountUncheckedCreateNestedManyWithoutUserInput
    Session?: SessionUncheckedCreateNestedManyWithoutUserInput
    karyawan?: karyawanUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    fcmToken?: NullableStringFieldUpdateOperationsInput | string | null
    Account?: AccountUpdateManyWithoutUserNestedInput
    Session?: SessionUpdateManyWithoutUserNestedInput
    karyawan?: karyawanUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    fcmToken?: NullableStringFieldUpdateOperationsInput | string | null
    Account?: AccountUncheckedUpdateManyWithoutUserNestedInput
    Session?: SessionUncheckedUpdateManyWithoutUserNestedInput
    karyawan?: karyawanUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    email: string
    password?: string | null
    name?: string | null
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt: Date | string
    isActive?: boolean
    fcmToken?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    fcmToken?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    fcmToken?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id: string
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt: Date | string
    User: UserCreateNestedOneWithoutSessionInput
  }

  export type SessionUncheckedCreateInput = {
    id: string
    userId: string
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id: string
    userId: string
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type companyCreateInput = {
    id: string
    KODE_CMPY: string
    COMPANY?: string | null
    ADDRESS1?: string | null
    ADDRESS2?: string | null
    ADDRESS3?: string | null
    TLP?: string | null
    FAX?: string | null
    NPWP?: string | null
    DIRECTOR?: string | null
    NPWPDIR?: string | null
    LOGO?: string | null
    NPP?: string | null
    ASTEKBAYAR?: string | null
    EMAIL?: string | null
    HOMEPAGE?: string | null
    HRDMNG?: string | null
    NPWPMNG?: string | null
    created_at?: Date | string
    updated_at: Date | string
    karyawan?: karyawanCreateNestedManyWithoutCompanyInput
  }

  export type companyUncheckedCreateInput = {
    id: string
    KODE_CMPY: string
    COMPANY?: string | null
    ADDRESS1?: string | null
    ADDRESS2?: string | null
    ADDRESS3?: string | null
    TLP?: string | null
    FAX?: string | null
    NPWP?: string | null
    DIRECTOR?: string | null
    NPWPDIR?: string | null
    LOGO?: string | null
    NPP?: string | null
    ASTEKBAYAR?: string | null
    EMAIL?: string | null
    HOMEPAGE?: string | null
    HRDMNG?: string | null
    NPWPMNG?: string | null
    created_at?: Date | string
    updated_at: Date | string
    karyawan?: karyawanUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type companyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    KODE_CMPY?: StringFieldUpdateOperationsInput | string
    COMPANY?: NullableStringFieldUpdateOperationsInput | string | null
    ADDRESS1?: NullableStringFieldUpdateOperationsInput | string | null
    ADDRESS2?: NullableStringFieldUpdateOperationsInput | string | null
    ADDRESS3?: NullableStringFieldUpdateOperationsInput | string | null
    TLP?: NullableStringFieldUpdateOperationsInput | string | null
    FAX?: NullableStringFieldUpdateOperationsInput | string | null
    NPWP?: NullableStringFieldUpdateOperationsInput | string | null
    DIRECTOR?: NullableStringFieldUpdateOperationsInput | string | null
    NPWPDIR?: NullableStringFieldUpdateOperationsInput | string | null
    LOGO?: NullableStringFieldUpdateOperationsInput | string | null
    NPP?: NullableStringFieldUpdateOperationsInput | string | null
    ASTEKBAYAR?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    HOMEPAGE?: NullableStringFieldUpdateOperationsInput | string | null
    HRDMNG?: NullableStringFieldUpdateOperationsInput | string | null
    NPWPMNG?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    karyawan?: karyawanUpdateManyWithoutCompanyNestedInput
  }

  export type companyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    KODE_CMPY?: StringFieldUpdateOperationsInput | string
    COMPANY?: NullableStringFieldUpdateOperationsInput | string | null
    ADDRESS1?: NullableStringFieldUpdateOperationsInput | string | null
    ADDRESS2?: NullableStringFieldUpdateOperationsInput | string | null
    ADDRESS3?: NullableStringFieldUpdateOperationsInput | string | null
    TLP?: NullableStringFieldUpdateOperationsInput | string | null
    FAX?: NullableStringFieldUpdateOperationsInput | string | null
    NPWP?: NullableStringFieldUpdateOperationsInput | string | null
    DIRECTOR?: NullableStringFieldUpdateOperationsInput | string | null
    NPWPDIR?: NullableStringFieldUpdateOperationsInput | string | null
    LOGO?: NullableStringFieldUpdateOperationsInput | string | null
    NPP?: NullableStringFieldUpdateOperationsInput | string | null
    ASTEKBAYAR?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    HOMEPAGE?: NullableStringFieldUpdateOperationsInput | string | null
    HRDMNG?: NullableStringFieldUpdateOperationsInput | string | null
    NPWPMNG?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    karyawan?: karyawanUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type companyCreateManyInput = {
    id: string
    KODE_CMPY: string
    COMPANY?: string | null
    ADDRESS1?: string | null
    ADDRESS2?: string | null
    ADDRESS3?: string | null
    TLP?: string | null
    FAX?: string | null
    NPWP?: string | null
    DIRECTOR?: string | null
    NPWPDIR?: string | null
    LOGO?: string | null
    NPP?: string | null
    ASTEKBAYAR?: string | null
    EMAIL?: string | null
    HOMEPAGE?: string | null
    HRDMNG?: string | null
    NPWPMNG?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type companyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    KODE_CMPY?: StringFieldUpdateOperationsInput | string
    COMPANY?: NullableStringFieldUpdateOperationsInput | string | null
    ADDRESS1?: NullableStringFieldUpdateOperationsInput | string | null
    ADDRESS2?: NullableStringFieldUpdateOperationsInput | string | null
    ADDRESS3?: NullableStringFieldUpdateOperationsInput | string | null
    TLP?: NullableStringFieldUpdateOperationsInput | string | null
    FAX?: NullableStringFieldUpdateOperationsInput | string | null
    NPWP?: NullableStringFieldUpdateOperationsInput | string | null
    DIRECTOR?: NullableStringFieldUpdateOperationsInput | string | null
    NPWPDIR?: NullableStringFieldUpdateOperationsInput | string | null
    LOGO?: NullableStringFieldUpdateOperationsInput | string | null
    NPP?: NullableStringFieldUpdateOperationsInput | string | null
    ASTEKBAYAR?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    HOMEPAGE?: NullableStringFieldUpdateOperationsInput | string | null
    HRDMNG?: NullableStringFieldUpdateOperationsInput | string | null
    NPWPMNG?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type companyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    KODE_CMPY?: StringFieldUpdateOperationsInput | string
    COMPANY?: NullableStringFieldUpdateOperationsInput | string | null
    ADDRESS1?: NullableStringFieldUpdateOperationsInput | string | null
    ADDRESS2?: NullableStringFieldUpdateOperationsInput | string | null
    ADDRESS3?: NullableStringFieldUpdateOperationsInput | string | null
    TLP?: NullableStringFieldUpdateOperationsInput | string | null
    FAX?: NullableStringFieldUpdateOperationsInput | string | null
    NPWP?: NullableStringFieldUpdateOperationsInput | string | null
    DIRECTOR?: NullableStringFieldUpdateOperationsInput | string | null
    NPWPDIR?: NullableStringFieldUpdateOperationsInput | string | null
    LOGO?: NullableStringFieldUpdateOperationsInput | string | null
    NPP?: NullableStringFieldUpdateOperationsInput | string | null
    ASTEKBAYAR?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    HOMEPAGE?: NullableStringFieldUpdateOperationsInput | string | null
    HRDMNG?: NullableStringFieldUpdateOperationsInput | string | null
    NPWPMNG?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type karyawanCreateInput = {
    EMPL_ID: string
    NIK?: string | null
    NAMA?: string | null
    KD_FACT?: string | null
    KD_SEKSIE?: string | null
    KD_PKT?: string | null
    KD_AGM?: string | null
    KD_SKL?: string | null
    BANK_CODE?: string | null
    KD_SEX?: $Enums.JenisKelamin | null
    ALAMAT1?: string | null
    KOTA?: string | null
    TELPON?: string | null
    HANDPHONE?: string | null
    EMAIL?: string | null
    TGL_LHR?: Date | string | null
    TGL_MSK?: Date | string | null
    TGL_OUT?: Date | string | null
    ALASAN_OUT?: string | null
    KD_OUT?: boolean | null
    KD_JNS?: $Enums.StatusKaryawan | null
    KD_STS?: $Enums.StatusAktif | null
    created_at?: Date | string
    updated_at: Date | string
    company?: companyCreateNestedOneWithoutKaryawanInput
    mstdept?: mstdeptCreateNestedOneWithoutKaryawanInput
    mstjab?: mstjabCreateNestedOneWithoutKaryawanInput
    mstbag?: mstbagCreateNestedOneWithoutKaryawanInput
    User?: UserCreateNestedOneWithoutKaryawanInput
  }

  export type karyawanUncheckedCreateInput = {
    EMPL_ID: string
    user_id?: string | null
    NIK?: string | null
    NAMA?: string | null
    KD_CMPY?: string | null
    KD_FACT?: string | null
    KD_BAG?: string | null
    KD_DEPT?: string | null
    KD_SEKSIE?: string | null
    KD_PKT?: string | null
    KD_JAB?: string | null
    KD_AGM?: string | null
    KD_SKL?: string | null
    BANK_CODE?: string | null
    KD_SEX?: $Enums.JenisKelamin | null
    ALAMAT1?: string | null
    KOTA?: string | null
    TELPON?: string | null
    HANDPHONE?: string | null
    EMAIL?: string | null
    TGL_LHR?: Date | string | null
    TGL_MSK?: Date | string | null
    TGL_OUT?: Date | string | null
    ALASAN_OUT?: string | null
    KD_OUT?: boolean | null
    KD_JNS?: $Enums.StatusKaryawan | null
    KD_STS?: $Enums.StatusAktif | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type karyawanUpdateInput = {
    EMPL_ID?: StringFieldUpdateOperationsInput | string
    NIK?: NullableStringFieldUpdateOperationsInput | string | null
    NAMA?: NullableStringFieldUpdateOperationsInput | string | null
    KD_FACT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEKSIE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_PKT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_AGM?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SKL?: NullableStringFieldUpdateOperationsInput | string | null
    BANK_CODE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEX?: NullableEnumJenisKelaminFieldUpdateOperationsInput | $Enums.JenisKelamin | null
    ALAMAT1?: NullableStringFieldUpdateOperationsInput | string | null
    KOTA?: NullableStringFieldUpdateOperationsInput | string | null
    TELPON?: NullableStringFieldUpdateOperationsInput | string | null
    HANDPHONE?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    TGL_LHR?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_MSK?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_OUT?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ALASAN_OUT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_OUT?: NullableBoolFieldUpdateOperationsInput | boolean | null
    KD_JNS?: NullableEnumStatusKaryawanFieldUpdateOperationsInput | $Enums.StatusKaryawan | null
    KD_STS?: NullableEnumStatusAktifFieldUpdateOperationsInput | $Enums.StatusAktif | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: companyUpdateOneWithoutKaryawanNestedInput
    mstdept?: mstdeptUpdateOneWithoutKaryawanNestedInput
    mstjab?: mstjabUpdateOneWithoutKaryawanNestedInput
    mstbag?: mstbagUpdateOneWithoutKaryawanNestedInput
    User?: UserUpdateOneWithoutKaryawanNestedInput
  }

  export type karyawanUncheckedUpdateInput = {
    EMPL_ID?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    NIK?: NullableStringFieldUpdateOperationsInput | string | null
    NAMA?: NullableStringFieldUpdateOperationsInput | string | null
    KD_CMPY?: NullableStringFieldUpdateOperationsInput | string | null
    KD_FACT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_BAG?: NullableStringFieldUpdateOperationsInput | string | null
    KD_DEPT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEKSIE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_PKT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_JAB?: NullableStringFieldUpdateOperationsInput | string | null
    KD_AGM?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SKL?: NullableStringFieldUpdateOperationsInput | string | null
    BANK_CODE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEX?: NullableEnumJenisKelaminFieldUpdateOperationsInput | $Enums.JenisKelamin | null
    ALAMAT1?: NullableStringFieldUpdateOperationsInput | string | null
    KOTA?: NullableStringFieldUpdateOperationsInput | string | null
    TELPON?: NullableStringFieldUpdateOperationsInput | string | null
    HANDPHONE?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    TGL_LHR?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_MSK?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_OUT?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ALASAN_OUT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_OUT?: NullableBoolFieldUpdateOperationsInput | boolean | null
    KD_JNS?: NullableEnumStatusKaryawanFieldUpdateOperationsInput | $Enums.StatusKaryawan | null
    KD_STS?: NullableEnumStatusAktifFieldUpdateOperationsInput | $Enums.StatusAktif | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type karyawanCreateManyInput = {
    EMPL_ID: string
    user_id?: string | null
    NIK?: string | null
    NAMA?: string | null
    KD_CMPY?: string | null
    KD_FACT?: string | null
    KD_BAG?: string | null
    KD_DEPT?: string | null
    KD_SEKSIE?: string | null
    KD_PKT?: string | null
    KD_JAB?: string | null
    KD_AGM?: string | null
    KD_SKL?: string | null
    BANK_CODE?: string | null
    KD_SEX?: $Enums.JenisKelamin | null
    ALAMAT1?: string | null
    KOTA?: string | null
    TELPON?: string | null
    HANDPHONE?: string | null
    EMAIL?: string | null
    TGL_LHR?: Date | string | null
    TGL_MSK?: Date | string | null
    TGL_OUT?: Date | string | null
    ALASAN_OUT?: string | null
    KD_OUT?: boolean | null
    KD_JNS?: $Enums.StatusKaryawan | null
    KD_STS?: $Enums.StatusAktif | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type karyawanUpdateManyMutationInput = {
    EMPL_ID?: StringFieldUpdateOperationsInput | string
    NIK?: NullableStringFieldUpdateOperationsInput | string | null
    NAMA?: NullableStringFieldUpdateOperationsInput | string | null
    KD_FACT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEKSIE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_PKT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_AGM?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SKL?: NullableStringFieldUpdateOperationsInput | string | null
    BANK_CODE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEX?: NullableEnumJenisKelaminFieldUpdateOperationsInput | $Enums.JenisKelamin | null
    ALAMAT1?: NullableStringFieldUpdateOperationsInput | string | null
    KOTA?: NullableStringFieldUpdateOperationsInput | string | null
    TELPON?: NullableStringFieldUpdateOperationsInput | string | null
    HANDPHONE?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    TGL_LHR?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_MSK?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_OUT?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ALASAN_OUT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_OUT?: NullableBoolFieldUpdateOperationsInput | boolean | null
    KD_JNS?: NullableEnumStatusKaryawanFieldUpdateOperationsInput | $Enums.StatusKaryawan | null
    KD_STS?: NullableEnumStatusAktifFieldUpdateOperationsInput | $Enums.StatusAktif | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type karyawanUncheckedUpdateManyInput = {
    EMPL_ID?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    NIK?: NullableStringFieldUpdateOperationsInput | string | null
    NAMA?: NullableStringFieldUpdateOperationsInput | string | null
    KD_CMPY?: NullableStringFieldUpdateOperationsInput | string | null
    KD_FACT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_BAG?: NullableStringFieldUpdateOperationsInput | string | null
    KD_DEPT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEKSIE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_PKT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_JAB?: NullableStringFieldUpdateOperationsInput | string | null
    KD_AGM?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SKL?: NullableStringFieldUpdateOperationsInput | string | null
    BANK_CODE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEX?: NullableEnumJenisKelaminFieldUpdateOperationsInput | $Enums.JenisKelamin | null
    ALAMAT1?: NullableStringFieldUpdateOperationsInput | string | null
    KOTA?: NullableStringFieldUpdateOperationsInput | string | null
    TELPON?: NullableStringFieldUpdateOperationsInput | string | null
    HANDPHONE?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    TGL_LHR?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_MSK?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_OUT?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ALASAN_OUT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_OUT?: NullableBoolFieldUpdateOperationsInput | boolean | null
    KD_JNS?: NullableEnumStatusKaryawanFieldUpdateOperationsInput | $Enums.StatusKaryawan | null
    KD_STS?: NullableEnumStatusAktifFieldUpdateOperationsInput | $Enums.StatusAktif | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type mstdeptCreateInput = {
    id: string
    CKD_DEPT: string
    CNM_DEPT?: string | null
    created_at?: Date | string
    updated_at: Date | string
    karyawan?: karyawanCreateNestedManyWithoutMstdeptInput
  }

  export type mstdeptUncheckedCreateInput = {
    id: string
    CKD_DEPT: string
    CNM_DEPT?: string | null
    created_at?: Date | string
    updated_at: Date | string
    karyawan?: karyawanUncheckedCreateNestedManyWithoutMstdeptInput
  }

  export type mstdeptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    CKD_DEPT?: StringFieldUpdateOperationsInput | string
    CNM_DEPT?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    karyawan?: karyawanUpdateManyWithoutMstdeptNestedInput
  }

  export type mstdeptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    CKD_DEPT?: StringFieldUpdateOperationsInput | string
    CNM_DEPT?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    karyawan?: karyawanUncheckedUpdateManyWithoutMstdeptNestedInput
  }

  export type mstdeptCreateManyInput = {
    id: string
    CKD_DEPT: string
    CNM_DEPT?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type mstdeptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    CKD_DEPT?: StringFieldUpdateOperationsInput | string
    CNM_DEPT?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type mstdeptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    CKD_DEPT?: StringFieldUpdateOperationsInput | string
    CNM_DEPT?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type mstjabCreateInput = {
    id: string
    CKD_JAB: string
    CNM_JAB?: string | null
    created_at?: Date | string
    updated_at: Date | string
    karyawan?: karyawanCreateNestedManyWithoutMstjabInput
  }

  export type mstjabUncheckedCreateInput = {
    id: string
    CKD_JAB: string
    CNM_JAB?: string | null
    created_at?: Date | string
    updated_at: Date | string
    karyawan?: karyawanUncheckedCreateNestedManyWithoutMstjabInput
  }

  export type mstjabUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    CKD_JAB?: StringFieldUpdateOperationsInput | string
    CNM_JAB?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    karyawan?: karyawanUpdateManyWithoutMstjabNestedInput
  }

  export type mstjabUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    CKD_JAB?: StringFieldUpdateOperationsInput | string
    CNM_JAB?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    karyawan?: karyawanUncheckedUpdateManyWithoutMstjabNestedInput
  }

  export type mstjabCreateManyInput = {
    id: string
    CKD_JAB: string
    CNM_JAB?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type mstjabUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    CKD_JAB?: StringFieldUpdateOperationsInput | string
    CNM_JAB?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type mstjabUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    CKD_JAB?: StringFieldUpdateOperationsInput | string
    CNM_JAB?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type mstbagCreateInput = {
    id: string
    CKD_BAG: string
    CNM_BAG?: string | null
    created_at?: Date | string
    updated_at: Date | string
    karyawan?: karyawanCreateNestedManyWithoutMstbagInput
  }

  export type mstbagUncheckedCreateInput = {
    id: string
    CKD_BAG: string
    CNM_BAG?: string | null
    created_at?: Date | string
    updated_at: Date | string
    karyawan?: karyawanUncheckedCreateNestedManyWithoutMstbagInput
  }

  export type mstbagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    CKD_BAG?: StringFieldUpdateOperationsInput | string
    CNM_BAG?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    karyawan?: karyawanUpdateManyWithoutMstbagNestedInput
  }

  export type mstbagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    CKD_BAG?: StringFieldUpdateOperationsInput | string
    CNM_BAG?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    karyawan?: karyawanUncheckedUpdateManyWithoutMstbagNestedInput
  }

  export type mstbagCreateManyInput = {
    id: string
    CKD_BAG: string
    CNM_BAG?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type mstbagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    CKD_BAG?: StringFieldUpdateOperationsInput | string
    CNM_BAG?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type mstbagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    CKD_BAG?: StringFieldUpdateOperationsInput | string
    CNM_BAG?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type KaryawanNullableScalarRelationFilter = {
    is?: karyawanWhereInput | null
    isNot?: karyawanWhereInput | null
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    fcmToken?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    fcmToken?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    fcmToken?: SortOrder
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionToken?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionToken?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionToken?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type KaryawanListRelationFilter = {
    every?: karyawanWhereInput
    some?: karyawanWhereInput
    none?: karyawanWhereInput
  }

  export type karyawanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type companyCountOrderByAggregateInput = {
    id?: SortOrder
    KODE_CMPY?: SortOrder
    COMPANY?: SortOrder
    ADDRESS1?: SortOrder
    ADDRESS2?: SortOrder
    ADDRESS3?: SortOrder
    TLP?: SortOrder
    FAX?: SortOrder
    NPWP?: SortOrder
    DIRECTOR?: SortOrder
    NPWPDIR?: SortOrder
    LOGO?: SortOrder
    NPP?: SortOrder
    ASTEKBAYAR?: SortOrder
    EMAIL?: SortOrder
    HOMEPAGE?: SortOrder
    HRDMNG?: SortOrder
    NPWPMNG?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type companyMaxOrderByAggregateInput = {
    id?: SortOrder
    KODE_CMPY?: SortOrder
    COMPANY?: SortOrder
    ADDRESS1?: SortOrder
    ADDRESS2?: SortOrder
    ADDRESS3?: SortOrder
    TLP?: SortOrder
    FAX?: SortOrder
    NPWP?: SortOrder
    DIRECTOR?: SortOrder
    NPWPDIR?: SortOrder
    LOGO?: SortOrder
    NPP?: SortOrder
    ASTEKBAYAR?: SortOrder
    EMAIL?: SortOrder
    HOMEPAGE?: SortOrder
    HRDMNG?: SortOrder
    NPWPMNG?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type companyMinOrderByAggregateInput = {
    id?: SortOrder
    KODE_CMPY?: SortOrder
    COMPANY?: SortOrder
    ADDRESS1?: SortOrder
    ADDRESS2?: SortOrder
    ADDRESS3?: SortOrder
    TLP?: SortOrder
    FAX?: SortOrder
    NPWP?: SortOrder
    DIRECTOR?: SortOrder
    NPWPDIR?: SortOrder
    LOGO?: SortOrder
    NPP?: SortOrder
    ASTEKBAYAR?: SortOrder
    EMAIL?: SortOrder
    HOMEPAGE?: SortOrder
    HRDMNG?: SortOrder
    NPWPMNG?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumJenisKelaminNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisKelamin | EnumJenisKelaminFieldRefInput<$PrismaModel> | null
    in?: $Enums.JenisKelamin[] | ListEnumJenisKelaminFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.JenisKelamin[] | ListEnumJenisKelaminFieldRefInput<$PrismaModel> | null
    not?: NestedEnumJenisKelaminNullableFilter<$PrismaModel> | $Enums.JenisKelamin | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type EnumStatusKaryawanNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKaryawan | EnumStatusKaryawanFieldRefInput<$PrismaModel> | null
    in?: $Enums.StatusKaryawan[] | ListEnumStatusKaryawanFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.StatusKaryawan[] | ListEnumStatusKaryawanFieldRefInput<$PrismaModel> | null
    not?: NestedEnumStatusKaryawanNullableFilter<$PrismaModel> | $Enums.StatusKaryawan | null
  }

  export type EnumStatusAktifNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusAktif | EnumStatusAktifFieldRefInput<$PrismaModel> | null
    in?: $Enums.StatusAktif[] | ListEnumStatusAktifFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.StatusAktif[] | ListEnumStatusAktifFieldRefInput<$PrismaModel> | null
    not?: NestedEnumStatusAktifNullableFilter<$PrismaModel> | $Enums.StatusAktif | null
  }

  export type CompanyNullableScalarRelationFilter = {
    is?: companyWhereInput | null
    isNot?: companyWhereInput | null
  }

  export type MstdeptNullableScalarRelationFilter = {
    is?: mstdeptWhereInput | null
    isNot?: mstdeptWhereInput | null
  }

  export type MstjabNullableScalarRelationFilter = {
    is?: mstjabWhereInput | null
    isNot?: mstjabWhereInput | null
  }

  export type MstbagNullableScalarRelationFilter = {
    is?: mstbagWhereInput | null
    isNot?: mstbagWhereInput | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type karyawanCountOrderByAggregateInput = {
    EMPL_ID?: SortOrder
    user_id?: SortOrder
    NIK?: SortOrder
    NAMA?: SortOrder
    KD_CMPY?: SortOrder
    KD_FACT?: SortOrder
    KD_BAG?: SortOrder
    KD_DEPT?: SortOrder
    KD_SEKSIE?: SortOrder
    KD_PKT?: SortOrder
    KD_JAB?: SortOrder
    KD_AGM?: SortOrder
    KD_SKL?: SortOrder
    BANK_CODE?: SortOrder
    KD_SEX?: SortOrder
    ALAMAT1?: SortOrder
    KOTA?: SortOrder
    TELPON?: SortOrder
    HANDPHONE?: SortOrder
    EMAIL?: SortOrder
    TGL_LHR?: SortOrder
    TGL_MSK?: SortOrder
    TGL_OUT?: SortOrder
    ALASAN_OUT?: SortOrder
    KD_OUT?: SortOrder
    KD_JNS?: SortOrder
    KD_STS?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type karyawanMaxOrderByAggregateInput = {
    EMPL_ID?: SortOrder
    user_id?: SortOrder
    NIK?: SortOrder
    NAMA?: SortOrder
    KD_CMPY?: SortOrder
    KD_FACT?: SortOrder
    KD_BAG?: SortOrder
    KD_DEPT?: SortOrder
    KD_SEKSIE?: SortOrder
    KD_PKT?: SortOrder
    KD_JAB?: SortOrder
    KD_AGM?: SortOrder
    KD_SKL?: SortOrder
    BANK_CODE?: SortOrder
    KD_SEX?: SortOrder
    ALAMAT1?: SortOrder
    KOTA?: SortOrder
    TELPON?: SortOrder
    HANDPHONE?: SortOrder
    EMAIL?: SortOrder
    TGL_LHR?: SortOrder
    TGL_MSK?: SortOrder
    TGL_OUT?: SortOrder
    ALASAN_OUT?: SortOrder
    KD_OUT?: SortOrder
    KD_JNS?: SortOrder
    KD_STS?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type karyawanMinOrderByAggregateInput = {
    EMPL_ID?: SortOrder
    user_id?: SortOrder
    NIK?: SortOrder
    NAMA?: SortOrder
    KD_CMPY?: SortOrder
    KD_FACT?: SortOrder
    KD_BAG?: SortOrder
    KD_DEPT?: SortOrder
    KD_SEKSIE?: SortOrder
    KD_PKT?: SortOrder
    KD_JAB?: SortOrder
    KD_AGM?: SortOrder
    KD_SKL?: SortOrder
    BANK_CODE?: SortOrder
    KD_SEX?: SortOrder
    ALAMAT1?: SortOrder
    KOTA?: SortOrder
    TELPON?: SortOrder
    HANDPHONE?: SortOrder
    EMAIL?: SortOrder
    TGL_LHR?: SortOrder
    TGL_MSK?: SortOrder
    TGL_OUT?: SortOrder
    ALASAN_OUT?: SortOrder
    KD_OUT?: SortOrder
    KD_JNS?: SortOrder
    KD_STS?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EnumJenisKelaminNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisKelamin | EnumJenisKelaminFieldRefInput<$PrismaModel> | null
    in?: $Enums.JenisKelamin[] | ListEnumJenisKelaminFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.JenisKelamin[] | ListEnumJenisKelaminFieldRefInput<$PrismaModel> | null
    not?: NestedEnumJenisKelaminNullableWithAggregatesFilter<$PrismaModel> | $Enums.JenisKelamin | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumJenisKelaminNullableFilter<$PrismaModel>
    _max?: NestedEnumJenisKelaminNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type EnumStatusKaryawanNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKaryawan | EnumStatusKaryawanFieldRefInput<$PrismaModel> | null
    in?: $Enums.StatusKaryawan[] | ListEnumStatusKaryawanFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.StatusKaryawan[] | ListEnumStatusKaryawanFieldRefInput<$PrismaModel> | null
    not?: NestedEnumStatusKaryawanNullableWithAggregatesFilter<$PrismaModel> | $Enums.StatusKaryawan | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumStatusKaryawanNullableFilter<$PrismaModel>
    _max?: NestedEnumStatusKaryawanNullableFilter<$PrismaModel>
  }

  export type EnumStatusAktifNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusAktif | EnumStatusAktifFieldRefInput<$PrismaModel> | null
    in?: $Enums.StatusAktif[] | ListEnumStatusAktifFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.StatusAktif[] | ListEnumStatusAktifFieldRefInput<$PrismaModel> | null
    not?: NestedEnumStatusAktifNullableWithAggregatesFilter<$PrismaModel> | $Enums.StatusAktif | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumStatusAktifNullableFilter<$PrismaModel>
    _max?: NestedEnumStatusAktifNullableFilter<$PrismaModel>
  }

  export type mstdeptCountOrderByAggregateInput = {
    id?: SortOrder
    CKD_DEPT?: SortOrder
    CNM_DEPT?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type mstdeptMaxOrderByAggregateInput = {
    id?: SortOrder
    CKD_DEPT?: SortOrder
    CNM_DEPT?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type mstdeptMinOrderByAggregateInput = {
    id?: SortOrder
    CKD_DEPT?: SortOrder
    CNM_DEPT?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type mstjabCountOrderByAggregateInput = {
    id?: SortOrder
    CKD_JAB?: SortOrder
    CNM_JAB?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type mstjabMaxOrderByAggregateInput = {
    id?: SortOrder
    CKD_JAB?: SortOrder
    CNM_JAB?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type mstjabMinOrderByAggregateInput = {
    id?: SortOrder
    CKD_JAB?: SortOrder
    CNM_JAB?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type mstbagCountOrderByAggregateInput = {
    id?: SortOrder
    CKD_BAG?: SortOrder
    CNM_BAG?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type mstbagMaxOrderByAggregateInput = {
    id?: SortOrder
    CKD_BAG?: SortOrder
    CNM_BAG?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type mstbagMinOrderByAggregateInput = {
    id?: SortOrder
    CKD_BAG?: SortOrder
    CNM_BAG?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserCreateNestedOneWithoutAccountInput = {
    create?: XOR<UserCreateWithoutAccountInput, UserUncheckedCreateWithoutAccountInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutAccountNestedInput = {
    create?: XOR<UserCreateWithoutAccountInput, UserUncheckedCreateWithoutAccountInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountInput
    upsert?: UserUpsertWithoutAccountInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountInput, UserUpdateWithoutAccountInput>, UserUncheckedUpdateWithoutAccountInput>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type karyawanCreateNestedOneWithoutUserInput = {
    create?: XOR<karyawanCreateWithoutUserInput, karyawanUncheckedCreateWithoutUserInput>
    connectOrCreate?: karyawanCreateOrConnectWithoutUserInput
    connect?: karyawanWhereUniqueInput
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type karyawanUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<karyawanCreateWithoutUserInput, karyawanUncheckedCreateWithoutUserInput>
    connectOrCreate?: karyawanCreateOrConnectWithoutUserInput
    connect?: karyawanWhereUniqueInput
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type karyawanUpdateOneWithoutUserNestedInput = {
    create?: XOR<karyawanCreateWithoutUserInput, karyawanUncheckedCreateWithoutUserInput>
    connectOrCreate?: karyawanCreateOrConnectWithoutUserInput
    upsert?: karyawanUpsertWithoutUserInput
    disconnect?: karyawanWhereInput | boolean
    delete?: karyawanWhereInput | boolean
    connect?: karyawanWhereUniqueInput
    update?: XOR<XOR<karyawanUpdateToOneWithWhereWithoutUserInput, karyawanUpdateWithoutUserInput>, karyawanUncheckedUpdateWithoutUserInput>
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type karyawanUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<karyawanCreateWithoutUserInput, karyawanUncheckedCreateWithoutUserInput>
    connectOrCreate?: karyawanCreateOrConnectWithoutUserInput
    upsert?: karyawanUpsertWithoutUserInput
    disconnect?: karyawanWhereInput | boolean
    delete?: karyawanWhereInput | boolean
    connect?: karyawanWhereUniqueInput
    update?: XOR<XOR<karyawanUpdateToOneWithWhereWithoutUserInput, karyawanUpdateWithoutUserInput>, karyawanUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutSessionInput = {
    create?: XOR<UserCreateWithoutSessionInput, UserUncheckedCreateWithoutSessionInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionNestedInput = {
    create?: XOR<UserCreateWithoutSessionInput, UserUncheckedCreateWithoutSessionInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionInput
    upsert?: UserUpsertWithoutSessionInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionInput, UserUpdateWithoutSessionInput>, UserUncheckedUpdateWithoutSessionInput>
  }

  export type karyawanCreateNestedManyWithoutCompanyInput = {
    create?: XOR<karyawanCreateWithoutCompanyInput, karyawanUncheckedCreateWithoutCompanyInput> | karyawanCreateWithoutCompanyInput[] | karyawanUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: karyawanCreateOrConnectWithoutCompanyInput | karyawanCreateOrConnectWithoutCompanyInput[]
    createMany?: karyawanCreateManyCompanyInputEnvelope
    connect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
  }

  export type karyawanUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<karyawanCreateWithoutCompanyInput, karyawanUncheckedCreateWithoutCompanyInput> | karyawanCreateWithoutCompanyInput[] | karyawanUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: karyawanCreateOrConnectWithoutCompanyInput | karyawanCreateOrConnectWithoutCompanyInput[]
    createMany?: karyawanCreateManyCompanyInputEnvelope
    connect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
  }

  export type karyawanUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<karyawanCreateWithoutCompanyInput, karyawanUncheckedCreateWithoutCompanyInput> | karyawanCreateWithoutCompanyInput[] | karyawanUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: karyawanCreateOrConnectWithoutCompanyInput | karyawanCreateOrConnectWithoutCompanyInput[]
    upsert?: karyawanUpsertWithWhereUniqueWithoutCompanyInput | karyawanUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: karyawanCreateManyCompanyInputEnvelope
    set?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    disconnect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    delete?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    connect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    update?: karyawanUpdateWithWhereUniqueWithoutCompanyInput | karyawanUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: karyawanUpdateManyWithWhereWithoutCompanyInput | karyawanUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: karyawanScalarWhereInput | karyawanScalarWhereInput[]
  }

  export type karyawanUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<karyawanCreateWithoutCompanyInput, karyawanUncheckedCreateWithoutCompanyInput> | karyawanCreateWithoutCompanyInput[] | karyawanUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: karyawanCreateOrConnectWithoutCompanyInput | karyawanCreateOrConnectWithoutCompanyInput[]
    upsert?: karyawanUpsertWithWhereUniqueWithoutCompanyInput | karyawanUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: karyawanCreateManyCompanyInputEnvelope
    set?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    disconnect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    delete?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    connect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    update?: karyawanUpdateWithWhereUniqueWithoutCompanyInput | karyawanUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: karyawanUpdateManyWithWhereWithoutCompanyInput | karyawanUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: karyawanScalarWhereInput | karyawanScalarWhereInput[]
  }

  export type companyCreateNestedOneWithoutKaryawanInput = {
    create?: XOR<companyCreateWithoutKaryawanInput, companyUncheckedCreateWithoutKaryawanInput>
    connectOrCreate?: companyCreateOrConnectWithoutKaryawanInput
    connect?: companyWhereUniqueInput
  }

  export type mstdeptCreateNestedOneWithoutKaryawanInput = {
    create?: XOR<mstdeptCreateWithoutKaryawanInput, mstdeptUncheckedCreateWithoutKaryawanInput>
    connectOrCreate?: mstdeptCreateOrConnectWithoutKaryawanInput
    connect?: mstdeptWhereUniqueInput
  }

  export type mstjabCreateNestedOneWithoutKaryawanInput = {
    create?: XOR<mstjabCreateWithoutKaryawanInput, mstjabUncheckedCreateWithoutKaryawanInput>
    connectOrCreate?: mstjabCreateOrConnectWithoutKaryawanInput
    connect?: mstjabWhereUniqueInput
  }

  export type mstbagCreateNestedOneWithoutKaryawanInput = {
    create?: XOR<mstbagCreateWithoutKaryawanInput, mstbagUncheckedCreateWithoutKaryawanInput>
    connectOrCreate?: mstbagCreateOrConnectWithoutKaryawanInput
    connect?: mstbagWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutKaryawanInput = {
    create?: XOR<UserCreateWithoutKaryawanInput, UserUncheckedCreateWithoutKaryawanInput>
    connectOrCreate?: UserCreateOrConnectWithoutKaryawanInput
    connect?: UserWhereUniqueInput
  }

  export type NullableEnumJenisKelaminFieldUpdateOperationsInput = {
    set?: $Enums.JenisKelamin | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableEnumStatusKaryawanFieldUpdateOperationsInput = {
    set?: $Enums.StatusKaryawan | null
  }

  export type NullableEnumStatusAktifFieldUpdateOperationsInput = {
    set?: $Enums.StatusAktif | null
  }

  export type companyUpdateOneWithoutKaryawanNestedInput = {
    create?: XOR<companyCreateWithoutKaryawanInput, companyUncheckedCreateWithoutKaryawanInput>
    connectOrCreate?: companyCreateOrConnectWithoutKaryawanInput
    upsert?: companyUpsertWithoutKaryawanInput
    disconnect?: companyWhereInput | boolean
    delete?: companyWhereInput | boolean
    connect?: companyWhereUniqueInput
    update?: XOR<XOR<companyUpdateToOneWithWhereWithoutKaryawanInput, companyUpdateWithoutKaryawanInput>, companyUncheckedUpdateWithoutKaryawanInput>
  }

  export type mstdeptUpdateOneWithoutKaryawanNestedInput = {
    create?: XOR<mstdeptCreateWithoutKaryawanInput, mstdeptUncheckedCreateWithoutKaryawanInput>
    connectOrCreate?: mstdeptCreateOrConnectWithoutKaryawanInput
    upsert?: mstdeptUpsertWithoutKaryawanInput
    disconnect?: mstdeptWhereInput | boolean
    delete?: mstdeptWhereInput | boolean
    connect?: mstdeptWhereUniqueInput
    update?: XOR<XOR<mstdeptUpdateToOneWithWhereWithoutKaryawanInput, mstdeptUpdateWithoutKaryawanInput>, mstdeptUncheckedUpdateWithoutKaryawanInput>
  }

  export type mstjabUpdateOneWithoutKaryawanNestedInput = {
    create?: XOR<mstjabCreateWithoutKaryawanInput, mstjabUncheckedCreateWithoutKaryawanInput>
    connectOrCreate?: mstjabCreateOrConnectWithoutKaryawanInput
    upsert?: mstjabUpsertWithoutKaryawanInput
    disconnect?: mstjabWhereInput | boolean
    delete?: mstjabWhereInput | boolean
    connect?: mstjabWhereUniqueInput
    update?: XOR<XOR<mstjabUpdateToOneWithWhereWithoutKaryawanInput, mstjabUpdateWithoutKaryawanInput>, mstjabUncheckedUpdateWithoutKaryawanInput>
  }

  export type mstbagUpdateOneWithoutKaryawanNestedInput = {
    create?: XOR<mstbagCreateWithoutKaryawanInput, mstbagUncheckedCreateWithoutKaryawanInput>
    connectOrCreate?: mstbagCreateOrConnectWithoutKaryawanInput
    upsert?: mstbagUpsertWithoutKaryawanInput
    disconnect?: mstbagWhereInput | boolean
    delete?: mstbagWhereInput | boolean
    connect?: mstbagWhereUniqueInput
    update?: XOR<XOR<mstbagUpdateToOneWithWhereWithoutKaryawanInput, mstbagUpdateWithoutKaryawanInput>, mstbagUncheckedUpdateWithoutKaryawanInput>
  }

  export type UserUpdateOneWithoutKaryawanNestedInput = {
    create?: XOR<UserCreateWithoutKaryawanInput, UserUncheckedCreateWithoutKaryawanInput>
    connectOrCreate?: UserCreateOrConnectWithoutKaryawanInput
    upsert?: UserUpsertWithoutKaryawanInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutKaryawanInput, UserUpdateWithoutKaryawanInput>, UserUncheckedUpdateWithoutKaryawanInput>
  }

  export type karyawanCreateNestedManyWithoutMstdeptInput = {
    create?: XOR<karyawanCreateWithoutMstdeptInput, karyawanUncheckedCreateWithoutMstdeptInput> | karyawanCreateWithoutMstdeptInput[] | karyawanUncheckedCreateWithoutMstdeptInput[]
    connectOrCreate?: karyawanCreateOrConnectWithoutMstdeptInput | karyawanCreateOrConnectWithoutMstdeptInput[]
    createMany?: karyawanCreateManyMstdeptInputEnvelope
    connect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
  }

  export type karyawanUncheckedCreateNestedManyWithoutMstdeptInput = {
    create?: XOR<karyawanCreateWithoutMstdeptInput, karyawanUncheckedCreateWithoutMstdeptInput> | karyawanCreateWithoutMstdeptInput[] | karyawanUncheckedCreateWithoutMstdeptInput[]
    connectOrCreate?: karyawanCreateOrConnectWithoutMstdeptInput | karyawanCreateOrConnectWithoutMstdeptInput[]
    createMany?: karyawanCreateManyMstdeptInputEnvelope
    connect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
  }

  export type karyawanUpdateManyWithoutMstdeptNestedInput = {
    create?: XOR<karyawanCreateWithoutMstdeptInput, karyawanUncheckedCreateWithoutMstdeptInput> | karyawanCreateWithoutMstdeptInput[] | karyawanUncheckedCreateWithoutMstdeptInput[]
    connectOrCreate?: karyawanCreateOrConnectWithoutMstdeptInput | karyawanCreateOrConnectWithoutMstdeptInput[]
    upsert?: karyawanUpsertWithWhereUniqueWithoutMstdeptInput | karyawanUpsertWithWhereUniqueWithoutMstdeptInput[]
    createMany?: karyawanCreateManyMstdeptInputEnvelope
    set?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    disconnect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    delete?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    connect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    update?: karyawanUpdateWithWhereUniqueWithoutMstdeptInput | karyawanUpdateWithWhereUniqueWithoutMstdeptInput[]
    updateMany?: karyawanUpdateManyWithWhereWithoutMstdeptInput | karyawanUpdateManyWithWhereWithoutMstdeptInput[]
    deleteMany?: karyawanScalarWhereInput | karyawanScalarWhereInput[]
  }

  export type karyawanUncheckedUpdateManyWithoutMstdeptNestedInput = {
    create?: XOR<karyawanCreateWithoutMstdeptInput, karyawanUncheckedCreateWithoutMstdeptInput> | karyawanCreateWithoutMstdeptInput[] | karyawanUncheckedCreateWithoutMstdeptInput[]
    connectOrCreate?: karyawanCreateOrConnectWithoutMstdeptInput | karyawanCreateOrConnectWithoutMstdeptInput[]
    upsert?: karyawanUpsertWithWhereUniqueWithoutMstdeptInput | karyawanUpsertWithWhereUniqueWithoutMstdeptInput[]
    createMany?: karyawanCreateManyMstdeptInputEnvelope
    set?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    disconnect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    delete?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    connect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    update?: karyawanUpdateWithWhereUniqueWithoutMstdeptInput | karyawanUpdateWithWhereUniqueWithoutMstdeptInput[]
    updateMany?: karyawanUpdateManyWithWhereWithoutMstdeptInput | karyawanUpdateManyWithWhereWithoutMstdeptInput[]
    deleteMany?: karyawanScalarWhereInput | karyawanScalarWhereInput[]
  }

  export type karyawanCreateNestedManyWithoutMstjabInput = {
    create?: XOR<karyawanCreateWithoutMstjabInput, karyawanUncheckedCreateWithoutMstjabInput> | karyawanCreateWithoutMstjabInput[] | karyawanUncheckedCreateWithoutMstjabInput[]
    connectOrCreate?: karyawanCreateOrConnectWithoutMstjabInput | karyawanCreateOrConnectWithoutMstjabInput[]
    createMany?: karyawanCreateManyMstjabInputEnvelope
    connect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
  }

  export type karyawanUncheckedCreateNestedManyWithoutMstjabInput = {
    create?: XOR<karyawanCreateWithoutMstjabInput, karyawanUncheckedCreateWithoutMstjabInput> | karyawanCreateWithoutMstjabInput[] | karyawanUncheckedCreateWithoutMstjabInput[]
    connectOrCreate?: karyawanCreateOrConnectWithoutMstjabInput | karyawanCreateOrConnectWithoutMstjabInput[]
    createMany?: karyawanCreateManyMstjabInputEnvelope
    connect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
  }

  export type karyawanUpdateManyWithoutMstjabNestedInput = {
    create?: XOR<karyawanCreateWithoutMstjabInput, karyawanUncheckedCreateWithoutMstjabInput> | karyawanCreateWithoutMstjabInput[] | karyawanUncheckedCreateWithoutMstjabInput[]
    connectOrCreate?: karyawanCreateOrConnectWithoutMstjabInput | karyawanCreateOrConnectWithoutMstjabInput[]
    upsert?: karyawanUpsertWithWhereUniqueWithoutMstjabInput | karyawanUpsertWithWhereUniqueWithoutMstjabInput[]
    createMany?: karyawanCreateManyMstjabInputEnvelope
    set?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    disconnect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    delete?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    connect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    update?: karyawanUpdateWithWhereUniqueWithoutMstjabInput | karyawanUpdateWithWhereUniqueWithoutMstjabInput[]
    updateMany?: karyawanUpdateManyWithWhereWithoutMstjabInput | karyawanUpdateManyWithWhereWithoutMstjabInput[]
    deleteMany?: karyawanScalarWhereInput | karyawanScalarWhereInput[]
  }

  export type karyawanUncheckedUpdateManyWithoutMstjabNestedInput = {
    create?: XOR<karyawanCreateWithoutMstjabInput, karyawanUncheckedCreateWithoutMstjabInput> | karyawanCreateWithoutMstjabInput[] | karyawanUncheckedCreateWithoutMstjabInput[]
    connectOrCreate?: karyawanCreateOrConnectWithoutMstjabInput | karyawanCreateOrConnectWithoutMstjabInput[]
    upsert?: karyawanUpsertWithWhereUniqueWithoutMstjabInput | karyawanUpsertWithWhereUniqueWithoutMstjabInput[]
    createMany?: karyawanCreateManyMstjabInputEnvelope
    set?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    disconnect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    delete?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    connect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    update?: karyawanUpdateWithWhereUniqueWithoutMstjabInput | karyawanUpdateWithWhereUniqueWithoutMstjabInput[]
    updateMany?: karyawanUpdateManyWithWhereWithoutMstjabInput | karyawanUpdateManyWithWhereWithoutMstjabInput[]
    deleteMany?: karyawanScalarWhereInput | karyawanScalarWhereInput[]
  }

  export type karyawanCreateNestedManyWithoutMstbagInput = {
    create?: XOR<karyawanCreateWithoutMstbagInput, karyawanUncheckedCreateWithoutMstbagInput> | karyawanCreateWithoutMstbagInput[] | karyawanUncheckedCreateWithoutMstbagInput[]
    connectOrCreate?: karyawanCreateOrConnectWithoutMstbagInput | karyawanCreateOrConnectWithoutMstbagInput[]
    createMany?: karyawanCreateManyMstbagInputEnvelope
    connect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
  }

  export type karyawanUncheckedCreateNestedManyWithoutMstbagInput = {
    create?: XOR<karyawanCreateWithoutMstbagInput, karyawanUncheckedCreateWithoutMstbagInput> | karyawanCreateWithoutMstbagInput[] | karyawanUncheckedCreateWithoutMstbagInput[]
    connectOrCreate?: karyawanCreateOrConnectWithoutMstbagInput | karyawanCreateOrConnectWithoutMstbagInput[]
    createMany?: karyawanCreateManyMstbagInputEnvelope
    connect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
  }

  export type karyawanUpdateManyWithoutMstbagNestedInput = {
    create?: XOR<karyawanCreateWithoutMstbagInput, karyawanUncheckedCreateWithoutMstbagInput> | karyawanCreateWithoutMstbagInput[] | karyawanUncheckedCreateWithoutMstbagInput[]
    connectOrCreate?: karyawanCreateOrConnectWithoutMstbagInput | karyawanCreateOrConnectWithoutMstbagInput[]
    upsert?: karyawanUpsertWithWhereUniqueWithoutMstbagInput | karyawanUpsertWithWhereUniqueWithoutMstbagInput[]
    createMany?: karyawanCreateManyMstbagInputEnvelope
    set?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    disconnect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    delete?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    connect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    update?: karyawanUpdateWithWhereUniqueWithoutMstbagInput | karyawanUpdateWithWhereUniqueWithoutMstbagInput[]
    updateMany?: karyawanUpdateManyWithWhereWithoutMstbagInput | karyawanUpdateManyWithWhereWithoutMstbagInput[]
    deleteMany?: karyawanScalarWhereInput | karyawanScalarWhereInput[]
  }

  export type karyawanUncheckedUpdateManyWithoutMstbagNestedInput = {
    create?: XOR<karyawanCreateWithoutMstbagInput, karyawanUncheckedCreateWithoutMstbagInput> | karyawanCreateWithoutMstbagInput[] | karyawanUncheckedCreateWithoutMstbagInput[]
    connectOrCreate?: karyawanCreateOrConnectWithoutMstbagInput | karyawanCreateOrConnectWithoutMstbagInput[]
    upsert?: karyawanUpsertWithWhereUniqueWithoutMstbagInput | karyawanUpsertWithWhereUniqueWithoutMstbagInput[]
    createMany?: karyawanCreateManyMstbagInputEnvelope
    set?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    disconnect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    delete?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    connect?: karyawanWhereUniqueInput | karyawanWhereUniqueInput[]
    update?: karyawanUpdateWithWhereUniqueWithoutMstbagInput | karyawanUpdateWithWhereUniqueWithoutMstbagInput[]
    updateMany?: karyawanUpdateManyWithWhereWithoutMstbagInput | karyawanUpdateManyWithWhereWithoutMstbagInput[]
    deleteMany?: karyawanScalarWhereInput | karyawanScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumJenisKelaminNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisKelamin | EnumJenisKelaminFieldRefInput<$PrismaModel> | null
    in?: $Enums.JenisKelamin[] | ListEnumJenisKelaminFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.JenisKelamin[] | ListEnumJenisKelaminFieldRefInput<$PrismaModel> | null
    not?: NestedEnumJenisKelaminNullableFilter<$PrismaModel> | $Enums.JenisKelamin | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedEnumStatusKaryawanNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKaryawan | EnumStatusKaryawanFieldRefInput<$PrismaModel> | null
    in?: $Enums.StatusKaryawan[] | ListEnumStatusKaryawanFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.StatusKaryawan[] | ListEnumStatusKaryawanFieldRefInput<$PrismaModel> | null
    not?: NestedEnumStatusKaryawanNullableFilter<$PrismaModel> | $Enums.StatusKaryawan | null
  }

  export type NestedEnumStatusAktifNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusAktif | EnumStatusAktifFieldRefInput<$PrismaModel> | null
    in?: $Enums.StatusAktif[] | ListEnumStatusAktifFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.StatusAktif[] | ListEnumStatusAktifFieldRefInput<$PrismaModel> | null
    not?: NestedEnumStatusAktifNullableFilter<$PrismaModel> | $Enums.StatusAktif | null
  }

  export type NestedEnumJenisKelaminNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisKelamin | EnumJenisKelaminFieldRefInput<$PrismaModel> | null
    in?: $Enums.JenisKelamin[] | ListEnumJenisKelaminFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.JenisKelamin[] | ListEnumJenisKelaminFieldRefInput<$PrismaModel> | null
    not?: NestedEnumJenisKelaminNullableWithAggregatesFilter<$PrismaModel> | $Enums.JenisKelamin | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumJenisKelaminNullableFilter<$PrismaModel>
    _max?: NestedEnumJenisKelaminNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedEnumStatusKaryawanNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKaryawan | EnumStatusKaryawanFieldRefInput<$PrismaModel> | null
    in?: $Enums.StatusKaryawan[] | ListEnumStatusKaryawanFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.StatusKaryawan[] | ListEnumStatusKaryawanFieldRefInput<$PrismaModel> | null
    not?: NestedEnumStatusKaryawanNullableWithAggregatesFilter<$PrismaModel> | $Enums.StatusKaryawan | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumStatusKaryawanNullableFilter<$PrismaModel>
    _max?: NestedEnumStatusKaryawanNullableFilter<$PrismaModel>
  }

  export type NestedEnumStatusAktifNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusAktif | EnumStatusAktifFieldRefInput<$PrismaModel> | null
    in?: $Enums.StatusAktif[] | ListEnumStatusAktifFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.StatusAktif[] | ListEnumStatusAktifFieldRefInput<$PrismaModel> | null
    not?: NestedEnumStatusAktifNullableWithAggregatesFilter<$PrismaModel> | $Enums.StatusAktif | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumStatusAktifNullableFilter<$PrismaModel>
    _max?: NestedEnumStatusAktifNullableFilter<$PrismaModel>
  }

  export type UserCreateWithoutAccountInput = {
    id: string
    email: string
    password?: string | null
    name?: string | null
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt: Date | string
    isActive?: boolean
    fcmToken?: string | null
    Session?: SessionCreateNestedManyWithoutUserInput
    karyawan?: karyawanCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountInput = {
    id: string
    email: string
    password?: string | null
    name?: string | null
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt: Date | string
    isActive?: boolean
    fcmToken?: string | null
    Session?: SessionUncheckedCreateNestedManyWithoutUserInput
    karyawan?: karyawanUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountInput, UserUncheckedCreateWithoutAccountInput>
  }

  export type UserUpsertWithoutAccountInput = {
    update: XOR<UserUpdateWithoutAccountInput, UserUncheckedUpdateWithoutAccountInput>
    create: XOR<UserCreateWithoutAccountInput, UserUncheckedCreateWithoutAccountInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountInput, UserUncheckedUpdateWithoutAccountInput>
  }

  export type UserUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    fcmToken?: NullableStringFieldUpdateOperationsInput | string | null
    Session?: SessionUpdateManyWithoutUserNestedInput
    karyawan?: karyawanUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    fcmToken?: NullableStringFieldUpdateOperationsInput | string | null
    Session?: SessionUncheckedUpdateManyWithoutUserNestedInput
    karyawan?: karyawanUncheckedUpdateOneWithoutUserNestedInput
  }

  export type AccountCreateWithoutUserInput = {
    id: string
    provider: string
    providerAccountId: string
    access_token?: string | null
    refresh_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    type?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id: string
    provider: string
    providerAccountId: string
    access_token?: string | null
    refresh_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    type?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id: string
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id: string
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type karyawanCreateWithoutUserInput = {
    EMPL_ID: string
    NIK?: string | null
    NAMA?: string | null
    KD_FACT?: string | null
    KD_SEKSIE?: string | null
    KD_PKT?: string | null
    KD_AGM?: string | null
    KD_SKL?: string | null
    BANK_CODE?: string | null
    KD_SEX?: $Enums.JenisKelamin | null
    ALAMAT1?: string | null
    KOTA?: string | null
    TELPON?: string | null
    HANDPHONE?: string | null
    EMAIL?: string | null
    TGL_LHR?: Date | string | null
    TGL_MSK?: Date | string | null
    TGL_OUT?: Date | string | null
    ALASAN_OUT?: string | null
    KD_OUT?: boolean | null
    KD_JNS?: $Enums.StatusKaryawan | null
    KD_STS?: $Enums.StatusAktif | null
    created_at?: Date | string
    updated_at: Date | string
    company?: companyCreateNestedOneWithoutKaryawanInput
    mstdept?: mstdeptCreateNestedOneWithoutKaryawanInput
    mstjab?: mstjabCreateNestedOneWithoutKaryawanInput
    mstbag?: mstbagCreateNestedOneWithoutKaryawanInput
  }

  export type karyawanUncheckedCreateWithoutUserInput = {
    EMPL_ID: string
    NIK?: string | null
    NAMA?: string | null
    KD_CMPY?: string | null
    KD_FACT?: string | null
    KD_BAG?: string | null
    KD_DEPT?: string | null
    KD_SEKSIE?: string | null
    KD_PKT?: string | null
    KD_JAB?: string | null
    KD_AGM?: string | null
    KD_SKL?: string | null
    BANK_CODE?: string | null
    KD_SEX?: $Enums.JenisKelamin | null
    ALAMAT1?: string | null
    KOTA?: string | null
    TELPON?: string | null
    HANDPHONE?: string | null
    EMAIL?: string | null
    TGL_LHR?: Date | string | null
    TGL_MSK?: Date | string | null
    TGL_OUT?: Date | string | null
    ALASAN_OUT?: string | null
    KD_OUT?: boolean | null
    KD_JNS?: $Enums.StatusKaryawan | null
    KD_STS?: $Enums.StatusAktif | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type karyawanCreateOrConnectWithoutUserInput = {
    where: karyawanWhereUniqueInput
    create: XOR<karyawanCreateWithoutUserInput, karyawanUncheckedCreateWithoutUserInput>
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    access_token?: StringNullableFilter<"Account"> | string | null
    refresh_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    type?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type karyawanUpsertWithoutUserInput = {
    update: XOR<karyawanUpdateWithoutUserInput, karyawanUncheckedUpdateWithoutUserInput>
    create: XOR<karyawanCreateWithoutUserInput, karyawanUncheckedCreateWithoutUserInput>
    where?: karyawanWhereInput
  }

  export type karyawanUpdateToOneWithWhereWithoutUserInput = {
    where?: karyawanWhereInput
    data: XOR<karyawanUpdateWithoutUserInput, karyawanUncheckedUpdateWithoutUserInput>
  }

  export type karyawanUpdateWithoutUserInput = {
    EMPL_ID?: StringFieldUpdateOperationsInput | string
    NIK?: NullableStringFieldUpdateOperationsInput | string | null
    NAMA?: NullableStringFieldUpdateOperationsInput | string | null
    KD_FACT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEKSIE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_PKT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_AGM?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SKL?: NullableStringFieldUpdateOperationsInput | string | null
    BANK_CODE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEX?: NullableEnumJenisKelaminFieldUpdateOperationsInput | $Enums.JenisKelamin | null
    ALAMAT1?: NullableStringFieldUpdateOperationsInput | string | null
    KOTA?: NullableStringFieldUpdateOperationsInput | string | null
    TELPON?: NullableStringFieldUpdateOperationsInput | string | null
    HANDPHONE?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    TGL_LHR?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_MSK?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_OUT?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ALASAN_OUT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_OUT?: NullableBoolFieldUpdateOperationsInput | boolean | null
    KD_JNS?: NullableEnumStatusKaryawanFieldUpdateOperationsInput | $Enums.StatusKaryawan | null
    KD_STS?: NullableEnumStatusAktifFieldUpdateOperationsInput | $Enums.StatusAktif | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: companyUpdateOneWithoutKaryawanNestedInput
    mstdept?: mstdeptUpdateOneWithoutKaryawanNestedInput
    mstjab?: mstjabUpdateOneWithoutKaryawanNestedInput
    mstbag?: mstbagUpdateOneWithoutKaryawanNestedInput
  }

  export type karyawanUncheckedUpdateWithoutUserInput = {
    EMPL_ID?: StringFieldUpdateOperationsInput | string
    NIK?: NullableStringFieldUpdateOperationsInput | string | null
    NAMA?: NullableStringFieldUpdateOperationsInput | string | null
    KD_CMPY?: NullableStringFieldUpdateOperationsInput | string | null
    KD_FACT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_BAG?: NullableStringFieldUpdateOperationsInput | string | null
    KD_DEPT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEKSIE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_PKT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_JAB?: NullableStringFieldUpdateOperationsInput | string | null
    KD_AGM?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SKL?: NullableStringFieldUpdateOperationsInput | string | null
    BANK_CODE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEX?: NullableEnumJenisKelaminFieldUpdateOperationsInput | $Enums.JenisKelamin | null
    ALAMAT1?: NullableStringFieldUpdateOperationsInput | string | null
    KOTA?: NullableStringFieldUpdateOperationsInput | string | null
    TELPON?: NullableStringFieldUpdateOperationsInput | string | null
    HANDPHONE?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    TGL_LHR?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_MSK?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_OUT?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ALASAN_OUT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_OUT?: NullableBoolFieldUpdateOperationsInput | boolean | null
    KD_JNS?: NullableEnumStatusKaryawanFieldUpdateOperationsInput | $Enums.StatusKaryawan | null
    KD_STS?: NullableEnumStatusAktifFieldUpdateOperationsInput | $Enums.StatusAktif | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutSessionInput = {
    id: string
    email: string
    password?: string | null
    name?: string | null
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt: Date | string
    isActive?: boolean
    fcmToken?: string | null
    Account?: AccountCreateNestedManyWithoutUserInput
    karyawan?: karyawanCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionInput = {
    id: string
    email: string
    password?: string | null
    name?: string | null
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt: Date | string
    isActive?: boolean
    fcmToken?: string | null
    Account?: AccountUncheckedCreateNestedManyWithoutUserInput
    karyawan?: karyawanUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionInput, UserUncheckedCreateWithoutSessionInput>
  }

  export type UserUpsertWithoutSessionInput = {
    update: XOR<UserUpdateWithoutSessionInput, UserUncheckedUpdateWithoutSessionInput>
    create: XOR<UserCreateWithoutSessionInput, UserUncheckedCreateWithoutSessionInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionInput, UserUncheckedUpdateWithoutSessionInput>
  }

  export type UserUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    fcmToken?: NullableStringFieldUpdateOperationsInput | string | null
    Account?: AccountUpdateManyWithoutUserNestedInput
    karyawan?: karyawanUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    fcmToken?: NullableStringFieldUpdateOperationsInput | string | null
    Account?: AccountUncheckedUpdateManyWithoutUserNestedInput
    karyawan?: karyawanUncheckedUpdateOneWithoutUserNestedInput
  }

  export type karyawanCreateWithoutCompanyInput = {
    EMPL_ID: string
    NIK?: string | null
    NAMA?: string | null
    KD_FACT?: string | null
    KD_SEKSIE?: string | null
    KD_PKT?: string | null
    KD_AGM?: string | null
    KD_SKL?: string | null
    BANK_CODE?: string | null
    KD_SEX?: $Enums.JenisKelamin | null
    ALAMAT1?: string | null
    KOTA?: string | null
    TELPON?: string | null
    HANDPHONE?: string | null
    EMAIL?: string | null
    TGL_LHR?: Date | string | null
    TGL_MSK?: Date | string | null
    TGL_OUT?: Date | string | null
    ALASAN_OUT?: string | null
    KD_OUT?: boolean | null
    KD_JNS?: $Enums.StatusKaryawan | null
    KD_STS?: $Enums.StatusAktif | null
    created_at?: Date | string
    updated_at: Date | string
    mstdept?: mstdeptCreateNestedOneWithoutKaryawanInput
    mstjab?: mstjabCreateNestedOneWithoutKaryawanInput
    mstbag?: mstbagCreateNestedOneWithoutKaryawanInput
    User?: UserCreateNestedOneWithoutKaryawanInput
  }

  export type karyawanUncheckedCreateWithoutCompanyInput = {
    EMPL_ID: string
    user_id?: string | null
    NIK?: string | null
    NAMA?: string | null
    KD_FACT?: string | null
    KD_BAG?: string | null
    KD_DEPT?: string | null
    KD_SEKSIE?: string | null
    KD_PKT?: string | null
    KD_JAB?: string | null
    KD_AGM?: string | null
    KD_SKL?: string | null
    BANK_CODE?: string | null
    KD_SEX?: $Enums.JenisKelamin | null
    ALAMAT1?: string | null
    KOTA?: string | null
    TELPON?: string | null
    HANDPHONE?: string | null
    EMAIL?: string | null
    TGL_LHR?: Date | string | null
    TGL_MSK?: Date | string | null
    TGL_OUT?: Date | string | null
    ALASAN_OUT?: string | null
    KD_OUT?: boolean | null
    KD_JNS?: $Enums.StatusKaryawan | null
    KD_STS?: $Enums.StatusAktif | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type karyawanCreateOrConnectWithoutCompanyInput = {
    where: karyawanWhereUniqueInput
    create: XOR<karyawanCreateWithoutCompanyInput, karyawanUncheckedCreateWithoutCompanyInput>
  }

  export type karyawanCreateManyCompanyInputEnvelope = {
    data: karyawanCreateManyCompanyInput | karyawanCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type karyawanUpsertWithWhereUniqueWithoutCompanyInput = {
    where: karyawanWhereUniqueInput
    update: XOR<karyawanUpdateWithoutCompanyInput, karyawanUncheckedUpdateWithoutCompanyInput>
    create: XOR<karyawanCreateWithoutCompanyInput, karyawanUncheckedCreateWithoutCompanyInput>
  }

  export type karyawanUpdateWithWhereUniqueWithoutCompanyInput = {
    where: karyawanWhereUniqueInput
    data: XOR<karyawanUpdateWithoutCompanyInput, karyawanUncheckedUpdateWithoutCompanyInput>
  }

  export type karyawanUpdateManyWithWhereWithoutCompanyInput = {
    where: karyawanScalarWhereInput
    data: XOR<karyawanUpdateManyMutationInput, karyawanUncheckedUpdateManyWithoutCompanyInput>
  }

  export type karyawanScalarWhereInput = {
    AND?: karyawanScalarWhereInput | karyawanScalarWhereInput[]
    OR?: karyawanScalarWhereInput[]
    NOT?: karyawanScalarWhereInput | karyawanScalarWhereInput[]
    EMPL_ID?: StringFilter<"karyawan"> | string
    user_id?: StringNullableFilter<"karyawan"> | string | null
    NIK?: StringNullableFilter<"karyawan"> | string | null
    NAMA?: StringNullableFilter<"karyawan"> | string | null
    KD_CMPY?: StringNullableFilter<"karyawan"> | string | null
    KD_FACT?: StringNullableFilter<"karyawan"> | string | null
    KD_BAG?: StringNullableFilter<"karyawan"> | string | null
    KD_DEPT?: StringNullableFilter<"karyawan"> | string | null
    KD_SEKSIE?: StringNullableFilter<"karyawan"> | string | null
    KD_PKT?: StringNullableFilter<"karyawan"> | string | null
    KD_JAB?: StringNullableFilter<"karyawan"> | string | null
    KD_AGM?: StringNullableFilter<"karyawan"> | string | null
    KD_SKL?: StringNullableFilter<"karyawan"> | string | null
    BANK_CODE?: StringNullableFilter<"karyawan"> | string | null
    KD_SEX?: EnumJenisKelaminNullableFilter<"karyawan"> | $Enums.JenisKelamin | null
    ALAMAT1?: StringNullableFilter<"karyawan"> | string | null
    KOTA?: StringNullableFilter<"karyawan"> | string | null
    TELPON?: StringNullableFilter<"karyawan"> | string | null
    HANDPHONE?: StringNullableFilter<"karyawan"> | string | null
    EMAIL?: StringNullableFilter<"karyawan"> | string | null
    TGL_LHR?: DateTimeNullableFilter<"karyawan"> | Date | string | null
    TGL_MSK?: DateTimeNullableFilter<"karyawan"> | Date | string | null
    TGL_OUT?: DateTimeNullableFilter<"karyawan"> | Date | string | null
    ALASAN_OUT?: StringNullableFilter<"karyawan"> | string | null
    KD_OUT?: BoolNullableFilter<"karyawan"> | boolean | null
    KD_JNS?: EnumStatusKaryawanNullableFilter<"karyawan"> | $Enums.StatusKaryawan | null
    KD_STS?: EnumStatusAktifNullableFilter<"karyawan"> | $Enums.StatusAktif | null
    created_at?: DateTimeFilter<"karyawan"> | Date | string
    updated_at?: DateTimeFilter<"karyawan"> | Date | string
  }

  export type companyCreateWithoutKaryawanInput = {
    id: string
    KODE_CMPY: string
    COMPANY?: string | null
    ADDRESS1?: string | null
    ADDRESS2?: string | null
    ADDRESS3?: string | null
    TLP?: string | null
    FAX?: string | null
    NPWP?: string | null
    DIRECTOR?: string | null
    NPWPDIR?: string | null
    LOGO?: string | null
    NPP?: string | null
    ASTEKBAYAR?: string | null
    EMAIL?: string | null
    HOMEPAGE?: string | null
    HRDMNG?: string | null
    NPWPMNG?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type companyUncheckedCreateWithoutKaryawanInput = {
    id: string
    KODE_CMPY: string
    COMPANY?: string | null
    ADDRESS1?: string | null
    ADDRESS2?: string | null
    ADDRESS3?: string | null
    TLP?: string | null
    FAX?: string | null
    NPWP?: string | null
    DIRECTOR?: string | null
    NPWPDIR?: string | null
    LOGO?: string | null
    NPP?: string | null
    ASTEKBAYAR?: string | null
    EMAIL?: string | null
    HOMEPAGE?: string | null
    HRDMNG?: string | null
    NPWPMNG?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type companyCreateOrConnectWithoutKaryawanInput = {
    where: companyWhereUniqueInput
    create: XOR<companyCreateWithoutKaryawanInput, companyUncheckedCreateWithoutKaryawanInput>
  }

  export type mstdeptCreateWithoutKaryawanInput = {
    id: string
    CKD_DEPT: string
    CNM_DEPT?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type mstdeptUncheckedCreateWithoutKaryawanInput = {
    id: string
    CKD_DEPT: string
    CNM_DEPT?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type mstdeptCreateOrConnectWithoutKaryawanInput = {
    where: mstdeptWhereUniqueInput
    create: XOR<mstdeptCreateWithoutKaryawanInput, mstdeptUncheckedCreateWithoutKaryawanInput>
  }

  export type mstjabCreateWithoutKaryawanInput = {
    id: string
    CKD_JAB: string
    CNM_JAB?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type mstjabUncheckedCreateWithoutKaryawanInput = {
    id: string
    CKD_JAB: string
    CNM_JAB?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type mstjabCreateOrConnectWithoutKaryawanInput = {
    where: mstjabWhereUniqueInput
    create: XOR<mstjabCreateWithoutKaryawanInput, mstjabUncheckedCreateWithoutKaryawanInput>
  }

  export type mstbagCreateWithoutKaryawanInput = {
    id: string
    CKD_BAG: string
    CNM_BAG?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type mstbagUncheckedCreateWithoutKaryawanInput = {
    id: string
    CKD_BAG: string
    CNM_BAG?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type mstbagCreateOrConnectWithoutKaryawanInput = {
    where: mstbagWhereUniqueInput
    create: XOR<mstbagCreateWithoutKaryawanInput, mstbagUncheckedCreateWithoutKaryawanInput>
  }

  export type UserCreateWithoutKaryawanInput = {
    id: string
    email: string
    password?: string | null
    name?: string | null
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt: Date | string
    isActive?: boolean
    fcmToken?: string | null
    Account?: AccountCreateNestedManyWithoutUserInput
    Session?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutKaryawanInput = {
    id: string
    email: string
    password?: string | null
    name?: string | null
    image?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt: Date | string
    isActive?: boolean
    fcmToken?: string | null
    Account?: AccountUncheckedCreateNestedManyWithoutUserInput
    Session?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutKaryawanInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutKaryawanInput, UserUncheckedCreateWithoutKaryawanInput>
  }

  export type companyUpsertWithoutKaryawanInput = {
    update: XOR<companyUpdateWithoutKaryawanInput, companyUncheckedUpdateWithoutKaryawanInput>
    create: XOR<companyCreateWithoutKaryawanInput, companyUncheckedCreateWithoutKaryawanInput>
    where?: companyWhereInput
  }

  export type companyUpdateToOneWithWhereWithoutKaryawanInput = {
    where?: companyWhereInput
    data: XOR<companyUpdateWithoutKaryawanInput, companyUncheckedUpdateWithoutKaryawanInput>
  }

  export type companyUpdateWithoutKaryawanInput = {
    id?: StringFieldUpdateOperationsInput | string
    KODE_CMPY?: StringFieldUpdateOperationsInput | string
    COMPANY?: NullableStringFieldUpdateOperationsInput | string | null
    ADDRESS1?: NullableStringFieldUpdateOperationsInput | string | null
    ADDRESS2?: NullableStringFieldUpdateOperationsInput | string | null
    ADDRESS3?: NullableStringFieldUpdateOperationsInput | string | null
    TLP?: NullableStringFieldUpdateOperationsInput | string | null
    FAX?: NullableStringFieldUpdateOperationsInput | string | null
    NPWP?: NullableStringFieldUpdateOperationsInput | string | null
    DIRECTOR?: NullableStringFieldUpdateOperationsInput | string | null
    NPWPDIR?: NullableStringFieldUpdateOperationsInput | string | null
    LOGO?: NullableStringFieldUpdateOperationsInput | string | null
    NPP?: NullableStringFieldUpdateOperationsInput | string | null
    ASTEKBAYAR?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    HOMEPAGE?: NullableStringFieldUpdateOperationsInput | string | null
    HRDMNG?: NullableStringFieldUpdateOperationsInput | string | null
    NPWPMNG?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type companyUncheckedUpdateWithoutKaryawanInput = {
    id?: StringFieldUpdateOperationsInput | string
    KODE_CMPY?: StringFieldUpdateOperationsInput | string
    COMPANY?: NullableStringFieldUpdateOperationsInput | string | null
    ADDRESS1?: NullableStringFieldUpdateOperationsInput | string | null
    ADDRESS2?: NullableStringFieldUpdateOperationsInput | string | null
    ADDRESS3?: NullableStringFieldUpdateOperationsInput | string | null
    TLP?: NullableStringFieldUpdateOperationsInput | string | null
    FAX?: NullableStringFieldUpdateOperationsInput | string | null
    NPWP?: NullableStringFieldUpdateOperationsInput | string | null
    DIRECTOR?: NullableStringFieldUpdateOperationsInput | string | null
    NPWPDIR?: NullableStringFieldUpdateOperationsInput | string | null
    LOGO?: NullableStringFieldUpdateOperationsInput | string | null
    NPP?: NullableStringFieldUpdateOperationsInput | string | null
    ASTEKBAYAR?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    HOMEPAGE?: NullableStringFieldUpdateOperationsInput | string | null
    HRDMNG?: NullableStringFieldUpdateOperationsInput | string | null
    NPWPMNG?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type mstdeptUpsertWithoutKaryawanInput = {
    update: XOR<mstdeptUpdateWithoutKaryawanInput, mstdeptUncheckedUpdateWithoutKaryawanInput>
    create: XOR<mstdeptCreateWithoutKaryawanInput, mstdeptUncheckedCreateWithoutKaryawanInput>
    where?: mstdeptWhereInput
  }

  export type mstdeptUpdateToOneWithWhereWithoutKaryawanInput = {
    where?: mstdeptWhereInput
    data: XOR<mstdeptUpdateWithoutKaryawanInput, mstdeptUncheckedUpdateWithoutKaryawanInput>
  }

  export type mstdeptUpdateWithoutKaryawanInput = {
    id?: StringFieldUpdateOperationsInput | string
    CKD_DEPT?: StringFieldUpdateOperationsInput | string
    CNM_DEPT?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type mstdeptUncheckedUpdateWithoutKaryawanInput = {
    id?: StringFieldUpdateOperationsInput | string
    CKD_DEPT?: StringFieldUpdateOperationsInput | string
    CNM_DEPT?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type mstjabUpsertWithoutKaryawanInput = {
    update: XOR<mstjabUpdateWithoutKaryawanInput, mstjabUncheckedUpdateWithoutKaryawanInput>
    create: XOR<mstjabCreateWithoutKaryawanInput, mstjabUncheckedCreateWithoutKaryawanInput>
    where?: mstjabWhereInput
  }

  export type mstjabUpdateToOneWithWhereWithoutKaryawanInput = {
    where?: mstjabWhereInput
    data: XOR<mstjabUpdateWithoutKaryawanInput, mstjabUncheckedUpdateWithoutKaryawanInput>
  }

  export type mstjabUpdateWithoutKaryawanInput = {
    id?: StringFieldUpdateOperationsInput | string
    CKD_JAB?: StringFieldUpdateOperationsInput | string
    CNM_JAB?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type mstjabUncheckedUpdateWithoutKaryawanInput = {
    id?: StringFieldUpdateOperationsInput | string
    CKD_JAB?: StringFieldUpdateOperationsInput | string
    CNM_JAB?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type mstbagUpsertWithoutKaryawanInput = {
    update: XOR<mstbagUpdateWithoutKaryawanInput, mstbagUncheckedUpdateWithoutKaryawanInput>
    create: XOR<mstbagCreateWithoutKaryawanInput, mstbagUncheckedCreateWithoutKaryawanInput>
    where?: mstbagWhereInput
  }

  export type mstbagUpdateToOneWithWhereWithoutKaryawanInput = {
    where?: mstbagWhereInput
    data: XOR<mstbagUpdateWithoutKaryawanInput, mstbagUncheckedUpdateWithoutKaryawanInput>
  }

  export type mstbagUpdateWithoutKaryawanInput = {
    id?: StringFieldUpdateOperationsInput | string
    CKD_BAG?: StringFieldUpdateOperationsInput | string
    CNM_BAG?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type mstbagUncheckedUpdateWithoutKaryawanInput = {
    id?: StringFieldUpdateOperationsInput | string
    CKD_BAG?: StringFieldUpdateOperationsInput | string
    CNM_BAG?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutKaryawanInput = {
    update: XOR<UserUpdateWithoutKaryawanInput, UserUncheckedUpdateWithoutKaryawanInput>
    create: XOR<UserCreateWithoutKaryawanInput, UserUncheckedCreateWithoutKaryawanInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutKaryawanInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutKaryawanInput, UserUncheckedUpdateWithoutKaryawanInput>
  }

  export type UserUpdateWithoutKaryawanInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    fcmToken?: NullableStringFieldUpdateOperationsInput | string | null
    Account?: AccountUpdateManyWithoutUserNestedInput
    Session?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutKaryawanInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    fcmToken?: NullableStringFieldUpdateOperationsInput | string | null
    Account?: AccountUncheckedUpdateManyWithoutUserNestedInput
    Session?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type karyawanCreateWithoutMstdeptInput = {
    EMPL_ID: string
    NIK?: string | null
    NAMA?: string | null
    KD_FACT?: string | null
    KD_SEKSIE?: string | null
    KD_PKT?: string | null
    KD_AGM?: string | null
    KD_SKL?: string | null
    BANK_CODE?: string | null
    KD_SEX?: $Enums.JenisKelamin | null
    ALAMAT1?: string | null
    KOTA?: string | null
    TELPON?: string | null
    HANDPHONE?: string | null
    EMAIL?: string | null
    TGL_LHR?: Date | string | null
    TGL_MSK?: Date | string | null
    TGL_OUT?: Date | string | null
    ALASAN_OUT?: string | null
    KD_OUT?: boolean | null
    KD_JNS?: $Enums.StatusKaryawan | null
    KD_STS?: $Enums.StatusAktif | null
    created_at?: Date | string
    updated_at: Date | string
    company?: companyCreateNestedOneWithoutKaryawanInput
    mstjab?: mstjabCreateNestedOneWithoutKaryawanInput
    mstbag?: mstbagCreateNestedOneWithoutKaryawanInput
    User?: UserCreateNestedOneWithoutKaryawanInput
  }

  export type karyawanUncheckedCreateWithoutMstdeptInput = {
    EMPL_ID: string
    user_id?: string | null
    NIK?: string | null
    NAMA?: string | null
    KD_CMPY?: string | null
    KD_FACT?: string | null
    KD_BAG?: string | null
    KD_SEKSIE?: string | null
    KD_PKT?: string | null
    KD_JAB?: string | null
    KD_AGM?: string | null
    KD_SKL?: string | null
    BANK_CODE?: string | null
    KD_SEX?: $Enums.JenisKelamin | null
    ALAMAT1?: string | null
    KOTA?: string | null
    TELPON?: string | null
    HANDPHONE?: string | null
    EMAIL?: string | null
    TGL_LHR?: Date | string | null
    TGL_MSK?: Date | string | null
    TGL_OUT?: Date | string | null
    ALASAN_OUT?: string | null
    KD_OUT?: boolean | null
    KD_JNS?: $Enums.StatusKaryawan | null
    KD_STS?: $Enums.StatusAktif | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type karyawanCreateOrConnectWithoutMstdeptInput = {
    where: karyawanWhereUniqueInput
    create: XOR<karyawanCreateWithoutMstdeptInput, karyawanUncheckedCreateWithoutMstdeptInput>
  }

  export type karyawanCreateManyMstdeptInputEnvelope = {
    data: karyawanCreateManyMstdeptInput | karyawanCreateManyMstdeptInput[]
    skipDuplicates?: boolean
  }

  export type karyawanUpsertWithWhereUniqueWithoutMstdeptInput = {
    where: karyawanWhereUniqueInput
    update: XOR<karyawanUpdateWithoutMstdeptInput, karyawanUncheckedUpdateWithoutMstdeptInput>
    create: XOR<karyawanCreateWithoutMstdeptInput, karyawanUncheckedCreateWithoutMstdeptInput>
  }

  export type karyawanUpdateWithWhereUniqueWithoutMstdeptInput = {
    where: karyawanWhereUniqueInput
    data: XOR<karyawanUpdateWithoutMstdeptInput, karyawanUncheckedUpdateWithoutMstdeptInput>
  }

  export type karyawanUpdateManyWithWhereWithoutMstdeptInput = {
    where: karyawanScalarWhereInput
    data: XOR<karyawanUpdateManyMutationInput, karyawanUncheckedUpdateManyWithoutMstdeptInput>
  }

  export type karyawanCreateWithoutMstjabInput = {
    EMPL_ID: string
    NIK?: string | null
    NAMA?: string | null
    KD_FACT?: string | null
    KD_SEKSIE?: string | null
    KD_PKT?: string | null
    KD_AGM?: string | null
    KD_SKL?: string | null
    BANK_CODE?: string | null
    KD_SEX?: $Enums.JenisKelamin | null
    ALAMAT1?: string | null
    KOTA?: string | null
    TELPON?: string | null
    HANDPHONE?: string | null
    EMAIL?: string | null
    TGL_LHR?: Date | string | null
    TGL_MSK?: Date | string | null
    TGL_OUT?: Date | string | null
    ALASAN_OUT?: string | null
    KD_OUT?: boolean | null
    KD_JNS?: $Enums.StatusKaryawan | null
    KD_STS?: $Enums.StatusAktif | null
    created_at?: Date | string
    updated_at: Date | string
    company?: companyCreateNestedOneWithoutKaryawanInput
    mstdept?: mstdeptCreateNestedOneWithoutKaryawanInput
    mstbag?: mstbagCreateNestedOneWithoutKaryawanInput
    User?: UserCreateNestedOneWithoutKaryawanInput
  }

  export type karyawanUncheckedCreateWithoutMstjabInput = {
    EMPL_ID: string
    user_id?: string | null
    NIK?: string | null
    NAMA?: string | null
    KD_CMPY?: string | null
    KD_FACT?: string | null
    KD_BAG?: string | null
    KD_DEPT?: string | null
    KD_SEKSIE?: string | null
    KD_PKT?: string | null
    KD_AGM?: string | null
    KD_SKL?: string | null
    BANK_CODE?: string | null
    KD_SEX?: $Enums.JenisKelamin | null
    ALAMAT1?: string | null
    KOTA?: string | null
    TELPON?: string | null
    HANDPHONE?: string | null
    EMAIL?: string | null
    TGL_LHR?: Date | string | null
    TGL_MSK?: Date | string | null
    TGL_OUT?: Date | string | null
    ALASAN_OUT?: string | null
    KD_OUT?: boolean | null
    KD_JNS?: $Enums.StatusKaryawan | null
    KD_STS?: $Enums.StatusAktif | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type karyawanCreateOrConnectWithoutMstjabInput = {
    where: karyawanWhereUniqueInput
    create: XOR<karyawanCreateWithoutMstjabInput, karyawanUncheckedCreateWithoutMstjabInput>
  }

  export type karyawanCreateManyMstjabInputEnvelope = {
    data: karyawanCreateManyMstjabInput | karyawanCreateManyMstjabInput[]
    skipDuplicates?: boolean
  }

  export type karyawanUpsertWithWhereUniqueWithoutMstjabInput = {
    where: karyawanWhereUniqueInput
    update: XOR<karyawanUpdateWithoutMstjabInput, karyawanUncheckedUpdateWithoutMstjabInput>
    create: XOR<karyawanCreateWithoutMstjabInput, karyawanUncheckedCreateWithoutMstjabInput>
  }

  export type karyawanUpdateWithWhereUniqueWithoutMstjabInput = {
    where: karyawanWhereUniqueInput
    data: XOR<karyawanUpdateWithoutMstjabInput, karyawanUncheckedUpdateWithoutMstjabInput>
  }

  export type karyawanUpdateManyWithWhereWithoutMstjabInput = {
    where: karyawanScalarWhereInput
    data: XOR<karyawanUpdateManyMutationInput, karyawanUncheckedUpdateManyWithoutMstjabInput>
  }

  export type karyawanCreateWithoutMstbagInput = {
    EMPL_ID: string
    NIK?: string | null
    NAMA?: string | null
    KD_FACT?: string | null
    KD_SEKSIE?: string | null
    KD_PKT?: string | null
    KD_AGM?: string | null
    KD_SKL?: string | null
    BANK_CODE?: string | null
    KD_SEX?: $Enums.JenisKelamin | null
    ALAMAT1?: string | null
    KOTA?: string | null
    TELPON?: string | null
    HANDPHONE?: string | null
    EMAIL?: string | null
    TGL_LHR?: Date | string | null
    TGL_MSK?: Date | string | null
    TGL_OUT?: Date | string | null
    ALASAN_OUT?: string | null
    KD_OUT?: boolean | null
    KD_JNS?: $Enums.StatusKaryawan | null
    KD_STS?: $Enums.StatusAktif | null
    created_at?: Date | string
    updated_at: Date | string
    company?: companyCreateNestedOneWithoutKaryawanInput
    mstdept?: mstdeptCreateNestedOneWithoutKaryawanInput
    mstjab?: mstjabCreateNestedOneWithoutKaryawanInput
    User?: UserCreateNestedOneWithoutKaryawanInput
  }

  export type karyawanUncheckedCreateWithoutMstbagInput = {
    EMPL_ID: string
    user_id?: string | null
    NIK?: string | null
    NAMA?: string | null
    KD_CMPY?: string | null
    KD_FACT?: string | null
    KD_DEPT?: string | null
    KD_SEKSIE?: string | null
    KD_PKT?: string | null
    KD_JAB?: string | null
    KD_AGM?: string | null
    KD_SKL?: string | null
    BANK_CODE?: string | null
    KD_SEX?: $Enums.JenisKelamin | null
    ALAMAT1?: string | null
    KOTA?: string | null
    TELPON?: string | null
    HANDPHONE?: string | null
    EMAIL?: string | null
    TGL_LHR?: Date | string | null
    TGL_MSK?: Date | string | null
    TGL_OUT?: Date | string | null
    ALASAN_OUT?: string | null
    KD_OUT?: boolean | null
    KD_JNS?: $Enums.StatusKaryawan | null
    KD_STS?: $Enums.StatusAktif | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type karyawanCreateOrConnectWithoutMstbagInput = {
    where: karyawanWhereUniqueInput
    create: XOR<karyawanCreateWithoutMstbagInput, karyawanUncheckedCreateWithoutMstbagInput>
  }

  export type karyawanCreateManyMstbagInputEnvelope = {
    data: karyawanCreateManyMstbagInput | karyawanCreateManyMstbagInput[]
    skipDuplicates?: boolean
  }

  export type karyawanUpsertWithWhereUniqueWithoutMstbagInput = {
    where: karyawanWhereUniqueInput
    update: XOR<karyawanUpdateWithoutMstbagInput, karyawanUncheckedUpdateWithoutMstbagInput>
    create: XOR<karyawanCreateWithoutMstbagInput, karyawanUncheckedCreateWithoutMstbagInput>
  }

  export type karyawanUpdateWithWhereUniqueWithoutMstbagInput = {
    where: karyawanWhereUniqueInput
    data: XOR<karyawanUpdateWithoutMstbagInput, karyawanUncheckedUpdateWithoutMstbagInput>
  }

  export type karyawanUpdateManyWithWhereWithoutMstbagInput = {
    where: karyawanScalarWhereInput
    data: XOR<karyawanUpdateManyMutationInput, karyawanUncheckedUpdateManyWithoutMstbagInput>
  }

  export type AccountCreateManyUserInput = {
    id: string
    provider: string
    providerAccountId: string
    access_token?: string | null
    refresh_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    type?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type SessionCreateManyUserInput = {
    id: string
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type karyawanCreateManyCompanyInput = {
    EMPL_ID: string
    user_id?: string | null
    NIK?: string | null
    NAMA?: string | null
    KD_FACT?: string | null
    KD_BAG?: string | null
    KD_DEPT?: string | null
    KD_SEKSIE?: string | null
    KD_PKT?: string | null
    KD_JAB?: string | null
    KD_AGM?: string | null
    KD_SKL?: string | null
    BANK_CODE?: string | null
    KD_SEX?: $Enums.JenisKelamin | null
    ALAMAT1?: string | null
    KOTA?: string | null
    TELPON?: string | null
    HANDPHONE?: string | null
    EMAIL?: string | null
    TGL_LHR?: Date | string | null
    TGL_MSK?: Date | string | null
    TGL_OUT?: Date | string | null
    ALASAN_OUT?: string | null
    KD_OUT?: boolean | null
    KD_JNS?: $Enums.StatusKaryawan | null
    KD_STS?: $Enums.StatusAktif | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type karyawanUpdateWithoutCompanyInput = {
    EMPL_ID?: StringFieldUpdateOperationsInput | string
    NIK?: NullableStringFieldUpdateOperationsInput | string | null
    NAMA?: NullableStringFieldUpdateOperationsInput | string | null
    KD_FACT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEKSIE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_PKT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_AGM?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SKL?: NullableStringFieldUpdateOperationsInput | string | null
    BANK_CODE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEX?: NullableEnumJenisKelaminFieldUpdateOperationsInput | $Enums.JenisKelamin | null
    ALAMAT1?: NullableStringFieldUpdateOperationsInput | string | null
    KOTA?: NullableStringFieldUpdateOperationsInput | string | null
    TELPON?: NullableStringFieldUpdateOperationsInput | string | null
    HANDPHONE?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    TGL_LHR?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_MSK?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_OUT?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ALASAN_OUT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_OUT?: NullableBoolFieldUpdateOperationsInput | boolean | null
    KD_JNS?: NullableEnumStatusKaryawanFieldUpdateOperationsInput | $Enums.StatusKaryawan | null
    KD_STS?: NullableEnumStatusAktifFieldUpdateOperationsInput | $Enums.StatusAktif | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    mstdept?: mstdeptUpdateOneWithoutKaryawanNestedInput
    mstjab?: mstjabUpdateOneWithoutKaryawanNestedInput
    mstbag?: mstbagUpdateOneWithoutKaryawanNestedInput
    User?: UserUpdateOneWithoutKaryawanNestedInput
  }

  export type karyawanUncheckedUpdateWithoutCompanyInput = {
    EMPL_ID?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    NIK?: NullableStringFieldUpdateOperationsInput | string | null
    NAMA?: NullableStringFieldUpdateOperationsInput | string | null
    KD_FACT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_BAG?: NullableStringFieldUpdateOperationsInput | string | null
    KD_DEPT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEKSIE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_PKT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_JAB?: NullableStringFieldUpdateOperationsInput | string | null
    KD_AGM?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SKL?: NullableStringFieldUpdateOperationsInput | string | null
    BANK_CODE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEX?: NullableEnumJenisKelaminFieldUpdateOperationsInput | $Enums.JenisKelamin | null
    ALAMAT1?: NullableStringFieldUpdateOperationsInput | string | null
    KOTA?: NullableStringFieldUpdateOperationsInput | string | null
    TELPON?: NullableStringFieldUpdateOperationsInput | string | null
    HANDPHONE?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    TGL_LHR?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_MSK?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_OUT?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ALASAN_OUT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_OUT?: NullableBoolFieldUpdateOperationsInput | boolean | null
    KD_JNS?: NullableEnumStatusKaryawanFieldUpdateOperationsInput | $Enums.StatusKaryawan | null
    KD_STS?: NullableEnumStatusAktifFieldUpdateOperationsInput | $Enums.StatusAktif | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type karyawanUncheckedUpdateManyWithoutCompanyInput = {
    EMPL_ID?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    NIK?: NullableStringFieldUpdateOperationsInput | string | null
    NAMA?: NullableStringFieldUpdateOperationsInput | string | null
    KD_FACT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_BAG?: NullableStringFieldUpdateOperationsInput | string | null
    KD_DEPT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEKSIE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_PKT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_JAB?: NullableStringFieldUpdateOperationsInput | string | null
    KD_AGM?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SKL?: NullableStringFieldUpdateOperationsInput | string | null
    BANK_CODE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEX?: NullableEnumJenisKelaminFieldUpdateOperationsInput | $Enums.JenisKelamin | null
    ALAMAT1?: NullableStringFieldUpdateOperationsInput | string | null
    KOTA?: NullableStringFieldUpdateOperationsInput | string | null
    TELPON?: NullableStringFieldUpdateOperationsInput | string | null
    HANDPHONE?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    TGL_LHR?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_MSK?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_OUT?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ALASAN_OUT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_OUT?: NullableBoolFieldUpdateOperationsInput | boolean | null
    KD_JNS?: NullableEnumStatusKaryawanFieldUpdateOperationsInput | $Enums.StatusKaryawan | null
    KD_STS?: NullableEnumStatusAktifFieldUpdateOperationsInput | $Enums.StatusAktif | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type karyawanCreateManyMstdeptInput = {
    EMPL_ID: string
    user_id?: string | null
    NIK?: string | null
    NAMA?: string | null
    KD_CMPY?: string | null
    KD_FACT?: string | null
    KD_BAG?: string | null
    KD_SEKSIE?: string | null
    KD_PKT?: string | null
    KD_JAB?: string | null
    KD_AGM?: string | null
    KD_SKL?: string | null
    BANK_CODE?: string | null
    KD_SEX?: $Enums.JenisKelamin | null
    ALAMAT1?: string | null
    KOTA?: string | null
    TELPON?: string | null
    HANDPHONE?: string | null
    EMAIL?: string | null
    TGL_LHR?: Date | string | null
    TGL_MSK?: Date | string | null
    TGL_OUT?: Date | string | null
    ALASAN_OUT?: string | null
    KD_OUT?: boolean | null
    KD_JNS?: $Enums.StatusKaryawan | null
    KD_STS?: $Enums.StatusAktif | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type karyawanUpdateWithoutMstdeptInput = {
    EMPL_ID?: StringFieldUpdateOperationsInput | string
    NIK?: NullableStringFieldUpdateOperationsInput | string | null
    NAMA?: NullableStringFieldUpdateOperationsInput | string | null
    KD_FACT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEKSIE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_PKT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_AGM?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SKL?: NullableStringFieldUpdateOperationsInput | string | null
    BANK_CODE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEX?: NullableEnumJenisKelaminFieldUpdateOperationsInput | $Enums.JenisKelamin | null
    ALAMAT1?: NullableStringFieldUpdateOperationsInput | string | null
    KOTA?: NullableStringFieldUpdateOperationsInput | string | null
    TELPON?: NullableStringFieldUpdateOperationsInput | string | null
    HANDPHONE?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    TGL_LHR?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_MSK?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_OUT?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ALASAN_OUT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_OUT?: NullableBoolFieldUpdateOperationsInput | boolean | null
    KD_JNS?: NullableEnumStatusKaryawanFieldUpdateOperationsInput | $Enums.StatusKaryawan | null
    KD_STS?: NullableEnumStatusAktifFieldUpdateOperationsInput | $Enums.StatusAktif | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: companyUpdateOneWithoutKaryawanNestedInput
    mstjab?: mstjabUpdateOneWithoutKaryawanNestedInput
    mstbag?: mstbagUpdateOneWithoutKaryawanNestedInput
    User?: UserUpdateOneWithoutKaryawanNestedInput
  }

  export type karyawanUncheckedUpdateWithoutMstdeptInput = {
    EMPL_ID?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    NIK?: NullableStringFieldUpdateOperationsInput | string | null
    NAMA?: NullableStringFieldUpdateOperationsInput | string | null
    KD_CMPY?: NullableStringFieldUpdateOperationsInput | string | null
    KD_FACT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_BAG?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEKSIE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_PKT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_JAB?: NullableStringFieldUpdateOperationsInput | string | null
    KD_AGM?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SKL?: NullableStringFieldUpdateOperationsInput | string | null
    BANK_CODE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEX?: NullableEnumJenisKelaminFieldUpdateOperationsInput | $Enums.JenisKelamin | null
    ALAMAT1?: NullableStringFieldUpdateOperationsInput | string | null
    KOTA?: NullableStringFieldUpdateOperationsInput | string | null
    TELPON?: NullableStringFieldUpdateOperationsInput | string | null
    HANDPHONE?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    TGL_LHR?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_MSK?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_OUT?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ALASAN_OUT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_OUT?: NullableBoolFieldUpdateOperationsInput | boolean | null
    KD_JNS?: NullableEnumStatusKaryawanFieldUpdateOperationsInput | $Enums.StatusKaryawan | null
    KD_STS?: NullableEnumStatusAktifFieldUpdateOperationsInput | $Enums.StatusAktif | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type karyawanUncheckedUpdateManyWithoutMstdeptInput = {
    EMPL_ID?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    NIK?: NullableStringFieldUpdateOperationsInput | string | null
    NAMA?: NullableStringFieldUpdateOperationsInput | string | null
    KD_CMPY?: NullableStringFieldUpdateOperationsInput | string | null
    KD_FACT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_BAG?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEKSIE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_PKT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_JAB?: NullableStringFieldUpdateOperationsInput | string | null
    KD_AGM?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SKL?: NullableStringFieldUpdateOperationsInput | string | null
    BANK_CODE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEX?: NullableEnumJenisKelaminFieldUpdateOperationsInput | $Enums.JenisKelamin | null
    ALAMAT1?: NullableStringFieldUpdateOperationsInput | string | null
    KOTA?: NullableStringFieldUpdateOperationsInput | string | null
    TELPON?: NullableStringFieldUpdateOperationsInput | string | null
    HANDPHONE?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    TGL_LHR?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_MSK?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_OUT?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ALASAN_OUT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_OUT?: NullableBoolFieldUpdateOperationsInput | boolean | null
    KD_JNS?: NullableEnumStatusKaryawanFieldUpdateOperationsInput | $Enums.StatusKaryawan | null
    KD_STS?: NullableEnumStatusAktifFieldUpdateOperationsInput | $Enums.StatusAktif | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type karyawanCreateManyMstjabInput = {
    EMPL_ID: string
    user_id?: string | null
    NIK?: string | null
    NAMA?: string | null
    KD_CMPY?: string | null
    KD_FACT?: string | null
    KD_BAG?: string | null
    KD_DEPT?: string | null
    KD_SEKSIE?: string | null
    KD_PKT?: string | null
    KD_AGM?: string | null
    KD_SKL?: string | null
    BANK_CODE?: string | null
    KD_SEX?: $Enums.JenisKelamin | null
    ALAMAT1?: string | null
    KOTA?: string | null
    TELPON?: string | null
    HANDPHONE?: string | null
    EMAIL?: string | null
    TGL_LHR?: Date | string | null
    TGL_MSK?: Date | string | null
    TGL_OUT?: Date | string | null
    ALASAN_OUT?: string | null
    KD_OUT?: boolean | null
    KD_JNS?: $Enums.StatusKaryawan | null
    KD_STS?: $Enums.StatusAktif | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type karyawanUpdateWithoutMstjabInput = {
    EMPL_ID?: StringFieldUpdateOperationsInput | string
    NIK?: NullableStringFieldUpdateOperationsInput | string | null
    NAMA?: NullableStringFieldUpdateOperationsInput | string | null
    KD_FACT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEKSIE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_PKT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_AGM?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SKL?: NullableStringFieldUpdateOperationsInput | string | null
    BANK_CODE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEX?: NullableEnumJenisKelaminFieldUpdateOperationsInput | $Enums.JenisKelamin | null
    ALAMAT1?: NullableStringFieldUpdateOperationsInput | string | null
    KOTA?: NullableStringFieldUpdateOperationsInput | string | null
    TELPON?: NullableStringFieldUpdateOperationsInput | string | null
    HANDPHONE?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    TGL_LHR?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_MSK?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_OUT?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ALASAN_OUT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_OUT?: NullableBoolFieldUpdateOperationsInput | boolean | null
    KD_JNS?: NullableEnumStatusKaryawanFieldUpdateOperationsInput | $Enums.StatusKaryawan | null
    KD_STS?: NullableEnumStatusAktifFieldUpdateOperationsInput | $Enums.StatusAktif | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: companyUpdateOneWithoutKaryawanNestedInput
    mstdept?: mstdeptUpdateOneWithoutKaryawanNestedInput
    mstbag?: mstbagUpdateOneWithoutKaryawanNestedInput
    User?: UserUpdateOneWithoutKaryawanNestedInput
  }

  export type karyawanUncheckedUpdateWithoutMstjabInput = {
    EMPL_ID?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    NIK?: NullableStringFieldUpdateOperationsInput | string | null
    NAMA?: NullableStringFieldUpdateOperationsInput | string | null
    KD_CMPY?: NullableStringFieldUpdateOperationsInput | string | null
    KD_FACT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_BAG?: NullableStringFieldUpdateOperationsInput | string | null
    KD_DEPT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEKSIE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_PKT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_AGM?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SKL?: NullableStringFieldUpdateOperationsInput | string | null
    BANK_CODE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEX?: NullableEnumJenisKelaminFieldUpdateOperationsInput | $Enums.JenisKelamin | null
    ALAMAT1?: NullableStringFieldUpdateOperationsInput | string | null
    KOTA?: NullableStringFieldUpdateOperationsInput | string | null
    TELPON?: NullableStringFieldUpdateOperationsInput | string | null
    HANDPHONE?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    TGL_LHR?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_MSK?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_OUT?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ALASAN_OUT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_OUT?: NullableBoolFieldUpdateOperationsInput | boolean | null
    KD_JNS?: NullableEnumStatusKaryawanFieldUpdateOperationsInput | $Enums.StatusKaryawan | null
    KD_STS?: NullableEnumStatusAktifFieldUpdateOperationsInput | $Enums.StatusAktif | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type karyawanUncheckedUpdateManyWithoutMstjabInput = {
    EMPL_ID?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    NIK?: NullableStringFieldUpdateOperationsInput | string | null
    NAMA?: NullableStringFieldUpdateOperationsInput | string | null
    KD_CMPY?: NullableStringFieldUpdateOperationsInput | string | null
    KD_FACT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_BAG?: NullableStringFieldUpdateOperationsInput | string | null
    KD_DEPT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEKSIE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_PKT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_AGM?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SKL?: NullableStringFieldUpdateOperationsInput | string | null
    BANK_CODE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEX?: NullableEnumJenisKelaminFieldUpdateOperationsInput | $Enums.JenisKelamin | null
    ALAMAT1?: NullableStringFieldUpdateOperationsInput | string | null
    KOTA?: NullableStringFieldUpdateOperationsInput | string | null
    TELPON?: NullableStringFieldUpdateOperationsInput | string | null
    HANDPHONE?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    TGL_LHR?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_MSK?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_OUT?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ALASAN_OUT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_OUT?: NullableBoolFieldUpdateOperationsInput | boolean | null
    KD_JNS?: NullableEnumStatusKaryawanFieldUpdateOperationsInput | $Enums.StatusKaryawan | null
    KD_STS?: NullableEnumStatusAktifFieldUpdateOperationsInput | $Enums.StatusAktif | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type karyawanCreateManyMstbagInput = {
    EMPL_ID: string
    user_id?: string | null
    NIK?: string | null
    NAMA?: string | null
    KD_CMPY?: string | null
    KD_FACT?: string | null
    KD_DEPT?: string | null
    KD_SEKSIE?: string | null
    KD_PKT?: string | null
    KD_JAB?: string | null
    KD_AGM?: string | null
    KD_SKL?: string | null
    BANK_CODE?: string | null
    KD_SEX?: $Enums.JenisKelamin | null
    ALAMAT1?: string | null
    KOTA?: string | null
    TELPON?: string | null
    HANDPHONE?: string | null
    EMAIL?: string | null
    TGL_LHR?: Date | string | null
    TGL_MSK?: Date | string | null
    TGL_OUT?: Date | string | null
    ALASAN_OUT?: string | null
    KD_OUT?: boolean | null
    KD_JNS?: $Enums.StatusKaryawan | null
    KD_STS?: $Enums.StatusAktif | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type karyawanUpdateWithoutMstbagInput = {
    EMPL_ID?: StringFieldUpdateOperationsInput | string
    NIK?: NullableStringFieldUpdateOperationsInput | string | null
    NAMA?: NullableStringFieldUpdateOperationsInput | string | null
    KD_FACT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEKSIE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_PKT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_AGM?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SKL?: NullableStringFieldUpdateOperationsInput | string | null
    BANK_CODE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEX?: NullableEnumJenisKelaminFieldUpdateOperationsInput | $Enums.JenisKelamin | null
    ALAMAT1?: NullableStringFieldUpdateOperationsInput | string | null
    KOTA?: NullableStringFieldUpdateOperationsInput | string | null
    TELPON?: NullableStringFieldUpdateOperationsInput | string | null
    HANDPHONE?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    TGL_LHR?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_MSK?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_OUT?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ALASAN_OUT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_OUT?: NullableBoolFieldUpdateOperationsInput | boolean | null
    KD_JNS?: NullableEnumStatusKaryawanFieldUpdateOperationsInput | $Enums.StatusKaryawan | null
    KD_STS?: NullableEnumStatusAktifFieldUpdateOperationsInput | $Enums.StatusAktif | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: companyUpdateOneWithoutKaryawanNestedInput
    mstdept?: mstdeptUpdateOneWithoutKaryawanNestedInput
    mstjab?: mstjabUpdateOneWithoutKaryawanNestedInput
    User?: UserUpdateOneWithoutKaryawanNestedInput
  }

  export type karyawanUncheckedUpdateWithoutMstbagInput = {
    EMPL_ID?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    NIK?: NullableStringFieldUpdateOperationsInput | string | null
    NAMA?: NullableStringFieldUpdateOperationsInput | string | null
    KD_CMPY?: NullableStringFieldUpdateOperationsInput | string | null
    KD_FACT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_DEPT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEKSIE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_PKT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_JAB?: NullableStringFieldUpdateOperationsInput | string | null
    KD_AGM?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SKL?: NullableStringFieldUpdateOperationsInput | string | null
    BANK_CODE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEX?: NullableEnumJenisKelaminFieldUpdateOperationsInput | $Enums.JenisKelamin | null
    ALAMAT1?: NullableStringFieldUpdateOperationsInput | string | null
    KOTA?: NullableStringFieldUpdateOperationsInput | string | null
    TELPON?: NullableStringFieldUpdateOperationsInput | string | null
    HANDPHONE?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    TGL_LHR?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_MSK?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_OUT?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ALASAN_OUT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_OUT?: NullableBoolFieldUpdateOperationsInput | boolean | null
    KD_JNS?: NullableEnumStatusKaryawanFieldUpdateOperationsInput | $Enums.StatusKaryawan | null
    KD_STS?: NullableEnumStatusAktifFieldUpdateOperationsInput | $Enums.StatusAktif | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type karyawanUncheckedUpdateManyWithoutMstbagInput = {
    EMPL_ID?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    NIK?: NullableStringFieldUpdateOperationsInput | string | null
    NAMA?: NullableStringFieldUpdateOperationsInput | string | null
    KD_CMPY?: NullableStringFieldUpdateOperationsInput | string | null
    KD_FACT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_DEPT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEKSIE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_PKT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_JAB?: NullableStringFieldUpdateOperationsInput | string | null
    KD_AGM?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SKL?: NullableStringFieldUpdateOperationsInput | string | null
    BANK_CODE?: NullableStringFieldUpdateOperationsInput | string | null
    KD_SEX?: NullableEnumJenisKelaminFieldUpdateOperationsInput | $Enums.JenisKelamin | null
    ALAMAT1?: NullableStringFieldUpdateOperationsInput | string | null
    KOTA?: NullableStringFieldUpdateOperationsInput | string | null
    TELPON?: NullableStringFieldUpdateOperationsInput | string | null
    HANDPHONE?: NullableStringFieldUpdateOperationsInput | string | null
    EMAIL?: NullableStringFieldUpdateOperationsInput | string | null
    TGL_LHR?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_MSK?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    TGL_OUT?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ALASAN_OUT?: NullableStringFieldUpdateOperationsInput | string | null
    KD_OUT?: NullableBoolFieldUpdateOperationsInput | boolean | null
    KD_JNS?: NullableEnumStatusKaryawanFieldUpdateOperationsInput | $Enums.StatusKaryawan | null
    KD_STS?: NullableEnumStatusAktifFieldUpdateOperationsInput | $Enums.StatusAktif | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
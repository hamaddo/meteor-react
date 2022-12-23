declare module 'meteor/meteor' {
  namespace Meteor {
    interface UserProfile {
      name: string;
      surname: string;
      patronymic: string;
      passport: string;
      role: string;
    }

    interface User {
      role?: string;
    }
  }
}

type AnyObject = Record<string, unknown>;

declare module 'meteor/cultofcoders:grapher' {
  import type { Mongo } from 'meteor/mongo';
  import type { Document } from 'mongodb';

  namespace Grapher {
    type TypesEnum = 'one' | 'many';

    interface Query {
      setParams(): never;

      resolve(): never;

      expose(): never;
    } // WIP

    type ILink<TSchema extends Document> =
      | {
          collection: Mongo.Collection<TSchema>;
          type: TypesEnum;
          metadata?: true;
          field: string;
          index?: boolean;
          denormalize?: iDenormalize;
        }
      | {
          collection: Mongo.Collection<TSchema>;
          inversedBy: string;
          denormalize?: iDenormalize;
        };

    type Link<TSchema extends Document> = {
      [field: string]: ILink<TSchema>;
    };

    type QueryOptions<T> = {
      $filter?: Mongo.FieldExpression<T>;
    };

    type Body<T> = {
      [field: string]: DependencyGraph | Body<T> | QueryOptions<T>;
    };

    type BodyEnum = 0 | 1;

    type GrapherBody<TSchema = AnyObject> = TSchema extends object
      ? SelectionSet<GraphQLQuery<TSchema>>
      : SelectionSet<BodyEnum>;

    type TEmbodyArgs<TArgs, TSchema = AnyObject> = {
      body: GrapherBody<TSchema>;
      getArgs(): TArgs;
    };

    type DependencyGraph = {
      [field: string]: GrapherBody | DependencyGraph;
    };

    type TFirewall<TFilters, TOptions> = (filters: TFilters, options: TOptions, userId: string) => void;

    interface SelectionSet<BodyType> {
      [field: string]: BodyType;
    }

    interface iDenormalize {
      field: string;
      body: {
        [field: string]: number;
      };
    }

    interface GraphQLQuery<TSchema extends object = AnyObject, TQueryArguments = AnyObject> {
      embody?: (transform: TEmbodyArgs<TQueryArguments>) => void;
      $filter?: Mongo.Selector<TSchema>;
      $options?: Mongo.Options<TSchema>;
      maxDepth?: number;
      maxLimit?: number;
      deny?: string[];
      intersect?: GrapherBody<TSchema>;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Exposure<TBody = AnyObject, TFilters = AnyObject, TOptions = AnyObject> {
      firewall?: TFirewall<TFilters, TOptions> | TFirewall<TFilters, TOptions>[];
      publication?: boolean; // Boolean
      method?: boolean; // Boolean
      blocking?: boolean; // Boolean
      maxLimit?: number; // Number
      maxDepth?: number; // Number
      restrictedFields?: string[]; // [String]
      restrictLinks?: string[] | ((...args: never[]) => never); // [String] or Function,
    }
  }
}

declare module 'meteor/mongo' {
  import type { Grapher } from 'meteor/cultofcoders:grapher';
  import type { Document } from 'mongodb';

  namespace Mongo {
    interface Collection<T = AnyObject> {
      attachSchema(schema: T): void;

      createQuery(name: string, body: Grapher.Body<T>, options?: AnyObject): Grapher.Query;

      createQuery(body: Grapher.Body<T>, options?: AnyObject): Grapher.Query;

      expose: Grapher.Exposure;

      addLinks<T extends Document>(links: Grapher.Link<T>): void;

      addReducers(): void;

      helpers(helpers: Record<string, (...args: unknown[]) => unknown>): void;
    }
  }
}

export interface VsSchema {
    id: {
        message: number;
    },
    currency: {
        message: string;
    },
    balance: {
        message: number
    }
}

export type ValidationSchema = {
    [key: string]:
      | VsSchema
      | VsSchema[]
      | {
          object?: ValidationSchema | ValidationSchema[];
          string?: VsSchema | VsSchema[];
        };
  };
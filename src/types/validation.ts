export interface VsSchema {
    id?: {
        message: number;
        required: {message: string}
    },
    currency?: {
        message: string;
    },
    balance?: {
        message: number
    },
    required: {
        message: string
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
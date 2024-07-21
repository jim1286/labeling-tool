// types/onnxruntime-web.d.ts
declare module "onnxruntime-web" {
  export class InferenceSession {
    static create(data: ArrayBuffer): Promise<InferenceSession>;
    run(inputs: any): Promise<any>;
    end(): void;
    outputNames: string[];
  }

  export class Tensor {
    constructor(
      type: "float32" | "int32",
      data: Buffer | Float32Array | Int32Array,
      dims: number[]
    );
  }
}

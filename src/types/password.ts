// パスワード生成オプション型
export type PasswordType = 'password' | 'uuid' | 'sha256';

export type PasswordOptions = {
  length: number;
  useSymbols: boolean;
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  type: PasswordType;
  firstUppercase?: boolean;
  forbiddenSymbols?: string;
};

export type PasswordResult = {
  result: string;
};

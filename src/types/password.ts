// パスワード生成オプション型
export type PasswordType = 'password' | 'uuid' | 'sha256';

export type PasswordOptions = {
  length: number;
  useSymbols: boolean;
  useUppercase: boolean;
  useLowercase: boolean;
  type: PasswordType;
};

export type PasswordResult = {
  result: string;
};

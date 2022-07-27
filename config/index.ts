interface Configuration {

  IsTest: () => boolean;

  IsDev: () => boolean;

  IsProd: () => boolean;
}

export const configuration = (): Configuration => ({

  IsTest: () => process.env.NODE_ENV === 'test',

  IsDev: () => process.env.NODE_ENV === 'development',

  IsProd: () => process.env.NODE_ENV === 'production',
});

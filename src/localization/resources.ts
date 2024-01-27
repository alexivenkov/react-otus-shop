export const resources = {
  en: {
    translation: {
      menu: {
        home: 'Home',
        profile: 'Profile',
        categories: 'Categories',
        products: 'Products',
      },
      forms: {
        profile: {
          info: 'Profile Info',
          changePassword: 'Change Password',
          password: 'Password',
          newpassword: 'New Password',
          repeatPassword: 'Repeat Password',
          email: 'Email',
          name: 'User Name',
          save: 'Save',
        },
        auth: {
          signIn: 'Sign In',
          signUp: 'Sign Up',
          email: 'Email',
          password: 'Password',
          signOut: 'Sign Out',
        },
        category: {
          create: 'New Category',
          update: 'Edit Category',
          save: 'Save',
          name: 'Name',
          photo: 'Photo',
          upload: {
            success: 'file uploaded successfully',
            invalid: 'filetype is not valid',
          },
        },
        product: {
          sale: 'Sale!',
          price: 'Price',
          description: 'Description',
        },
      },
      messages: {
        passwordUpdated: 'Password Updated Successfully',
        errors: {
          ERR_INCORRECT_PASSWORD: 'Incorrect password',
          ERR_INCORRECT_EMAIL_OR_PASSWORD: 'Incorrect email or password',
        },
      },
    },
  },
  ru: {
    translation: {
      menu: {
        home: 'Домой',
        profile: 'Профиль',
        categories: 'Категории',
        products: 'Товары',
      },
      forms: {
        profile: {
          info: 'Профиль',
          changePassword: 'Сменить Пароль',
          email: 'Электронный Адрес',
          name: 'Имя Пользователя',
          password: 'Пароль',
          newpassword: 'Новый Пароль',
          repeatPassword: 'Повторить Пароль',
          save: 'Save',
        },
        auth: {
          signIn: 'Войти',
          signUp: 'Зарегестрироваться',
          email: 'Электронный Адрес',
          password: 'Пароль',
          signOut: 'Выйти',
        },
        category: {
          create: 'Новая категория',
          update: 'Редактировать Категорию',
          save: 'Сохранить',
          name: 'Название',
          photo: 'Фото',
          upload: {
            success: 'файл успешно загружен',
            invalid: 'не валидный тип',
          },
        },
        product: {
          sale: 'Распродажа!',
          price: 'Цена',
          description: 'Описание',
        },
      },
      messages: {
        passwordUpdated: 'Пароль успешно обновлён',
        errors: {
          ERR_INCORRECT_PASSWORD: 'Не верный пароль',
          ERR_INCORRECT_EMAIL_OR_PASSWORD: 'Введены не верный логин и/или пароль',
        },
      },
    },
  },
};

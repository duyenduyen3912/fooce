export default {
    emailRules : [
        {
          type: 'email',
          message: 'Email address is not valid',
        },
        {
          required: true,
          message: 'Please input your email address!',
        },
      ],
      phoneRules : [
        {
          pattern: /^[0-9]{10}$/,
          message: 'Invalid phone number. Please enter 10 digits',
        },
        {
          required: true,
          message: 'Please input your phone number',
        },
      ]
}
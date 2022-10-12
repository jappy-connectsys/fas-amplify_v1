import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { 
    SENDGRID_LINK_TO_SEND_FORGOT_PASSWORD, 
    SENDGRID_LINK, 
    SENDGRID_EMAIL_SENDER, 
    SENDGRID_SENDER_NAME } from '../../config';
import { capitalizeFirstLetter } from '../../helper'
import { v4 as uuidv4 } from 'uuid';

const InitialState = {
  token: null,
  user:[],
  signing_up: false,
  errors_sign_up:undefined,
  success_sign_up:false,

  signing_in: false,
  errors_sign_in:undefined,
  success_sign_in:false,

  signing_out: false,

  // Forgot Pasword Validate
  status_validate_email:'idle',

  // Forgot Pasword
  status_forgot_password:'idle',

  // Reset Pasword Validate
  status_validate_reset_password:'idle',

  // Reset Pasword Validate
  status_reset_password:'idle',
  reset_password_error: null,

  reset_password_auth_id: null,
}

export const SignUp = createAsyncThunk(
    'auth/sign_up',
    async (values, { rejectWithValue, dispatch }) => {
        try {
            const response = await api.post('/users', values)
            const id = response.data.data.id
            const { role, status } = values
            const payload = {
                userid:id,
                company_id: "1",
                department: "Operation",
                app_module: "UAT",
                task_description: "1",
                user_role: null,
                user_role_id: role,
                status,
                user_activity_id: "1",
                created_by: "MW",
                updated_by: "MW",
                date_created: new Date().toISOString(),
                date_updated: new Date().toISOString()
            }
            if(response.data.data){
                dispatch(RegisterUserProfile(payload))
            }
            return response.data;
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const RegisterUserProfile = createAsyncThunk(
    'auth/sign_up',
    async (payload, { rejectWithValue, _ }) => {
        try {
            const response = await api.post('/items/user_profile', payload)
            return response.data;
          //return true
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const SignIn = createAsyncThunk(
    'auth/sign_in',
    async (payload, { rejectWithValue, _ }) => {
        const { email:emailParams } = payload
        const emailURI = encodeURIComponent(emailParams)
        try {
            const responseAuth = await api.post('/auth/login', payload)
            const responseMe = await api.get(`/users?filter[email][_eq]=${emailURI}`)
            const { id, first_name, last_name, email, role, status, last_access, email_notifications } = responseMe.data.data[0];
            const { access_token, refresh_token } = responseAuth.data.data;
            const res = {
                id, 
                first_name, 
                last_name, 
                email, 
                role,
                status, 
                last_access, 
                email_notifications,
                access_token,
                refresh_token
            }
            return res;
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const SignOut = createAsyncThunk(
    'auth/sign_out',
    async (payload, { rejectWithValue, _ }) => {
        try {
            await api.post('/auth/logout', payload)
            return true
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const ValidateEmail = createAsyncThunk(
    "auth/validate_email",
    async ({email}, { rejectWithValue }) => {
        const response = await api.get(`/users?filter[email][_eq]=${email}`)
        if(response.data.data.length > 0){
            return response.data.data
        }else{
            return rejectWithValue('Email is not registered!')
        }
    }
);

export const RequestForgotPassword = createAsyncThunk(
    'auth/request_forgot_password',
    async ({ email } , { rejectWithValue, dispatch }) => {
        const code = uuidv4();
        try {
            dispatch(ValidateEmail({email})).then(res => {
                const userId = res.payload[0].id;
                const lastName = capitalizeFirstLetter(res.payload[0].last_name)
                dispatch(UpdateExpiDateForgotPassword({userId, code}))
                dispatch(SendMailForgotPassword({code, email, lastName}))
            })
            return true;
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const UpdateExpiDateForgotPassword = createAsyncThunk(
    'auth/update_expi_date_forgot_password',
    async ({userId, code} , { rejectWithValue, dispatch }) => {
        try {
            var now  = new Date()
            now.setMinutes(now.getMinutes() + 180); // will expire in 3 hours 
            now = new Date(now);
                const payloadUpdate = {
                    "forgot_password_code": code,
                    "expiration_link_forgot_password_date": now
                }
        
                await api.patch(`/users/${userId}`,payloadUpdate)
                return true
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const SendMailForgotPassword = createAsyncThunk(
    'auth/send_mail_forgot_password',
    async ({code, email, lastName} , { rejectWithValue, _ }) => {
        const payload = {
            "personalizations": [
                {"to": [{ "email": email, "name": lastName }]},
                {
                    "from": {"email": SENDGRID_EMAIL_SENDER, "name": SENDGRID_SENDER_NAME},
                    "to": [{ "email": email,"name": lastName }]
                }
            ],
            "from": {
                "email": SENDGRID_EMAIL_SENDER,
                "name": SENDGRID_SENDER_NAME
            },
            "subject": "Forgot Password Link",
            "content": [
                {
                "type": "text/html",
                "value": `
                          Hello ${lastName},<br><br>
                          If you've lost your password or wish to reset it<br><br>
                          click the link below.<br><br><br>
                          ${SENDGRID_LINK}/${code}`
                }
          ]
        }

        const response = await api.post(SENDGRID_LINK_TO_SEND_FORGOT_PASSWORD, payload)
        if(response.status === 204){
            return response.data
        }else{
            return rejectWithValue('Something went wrong, Retry the procedure or contact the system admin.')
        }       
         
        
    }
)

export const ValidateExpirationDateResetPassword = createAsyncThunk(
    "auth/validate_expiration_date_reset_password",
    async ({token}, { rejectWithValue }) => {
        const response = await api.get(`/users?filter[forgot_password_code][_eq]=${token}`)
        
        if(response.data.data.length > 0){
            const userId = response.data.data[0].id;
            console.log('~~', userId);
            const expiration_link_forgot_password_date = response.data.data[0].expiration_link_forgot_password_date+'Z';
            var now = new Date();
            var today = now.toISOString().split('.')[0]+"Z"
            var d1 = new Date(today),  d2 = new Date(expiration_link_forgot_password_date);
            var diff = (d2 - d1)
            if (diff > 0) {
                return userId;
            }else{
                return rejectWithValue('ERROR_EXPIRED')
            }
        }else{
            return rejectWithValue('ERROR_INVALID_LINK')
        }
    }
);

export const ResetingPassword = createAsyncThunk(
    "auth/reset_password",
    async ({userId, password}, { rejectWithValue }) => {
        const payloadUpdate = {
            "forgot_password_code": null,
            "password": password
        }

        const response = await api.patch(`/users/${userId}`,payloadUpdate)
        console.log('~~', response);
     return
    }
);

export const ClearSignUp = createAsyncThunk(
    'auth/clear_sign_up',
     // eslint-disable-next-line no-empty-pattern
    async (_, {}) => true
)

export const ClearSignIn = createAsyncThunk(
    'auth/clear_sign_in',
     // eslint-disable-next-line no-empty-pattern
    async (_, {}) => true
)

export const ClearForgotPassword = createAsyncThunk(
    'auth/clear_forgot_password',
     // eslint-disable-next-line no-empty-pattern
    async (_, {}) => {
        return true;
    }
)

export const ClearResetPassword = createAsyncThunk(
    'auth/clear_reset_password',
    // eslint-disable-next-line no-empty-pattern
    async (_, {}) => {
        return true;
    }
)


export const auth = createSlice({
  name: "auth",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    /* CLEAR SIGN-UP */ 
    builder.addCase(ClearSignUp.fulfilled, (state, action) => {
        if (action.payload === true) {
          state.signing_up = false
          state.errors_sign_up = undefined;
          state.success_sign_up = false
        }
    });

    /* CLEAR SIGN-IN*/ 
    builder.addCase(ClearSignIn.fulfilled, (state, action) => {
        if (action.payload === true) {
          state.token = null
          state.signing_in = false
          state.errors_sign_in = undefined;
          state.success_sign_in = false
        }
    });

     /* CLEAR Reset Password */ 
     builder.addCase(ClearResetPassword.fulfilled, (state, action) => {
        if (action.payload === true) {
            state.reset_password_user_id = null
            state.status_reset_password = 'idle'
            state.reset_password_error = null
        }
    });

    /* CLEAR FORGOT PASSWORD */ 
    builder.addCase(ClearForgotPassword.fulfilled, (state, action) => {
        if (action.payload === true) {
            state.status_validate_email = 'idle'
            state.status_forgot_password = 'idle'
        }
    });

    /* SIGN-UP */
    builder.addCase(SignUp.pending, (state, _) => {
      state.signing_up = true
    })
    builder.addCase(SignUp.fulfilled, (state, action) => {
        state.signing_up = false
        if (action.payload) {
            state.success_sign_up = true
        }
    })
    builder.addCase(SignUp.rejected, (state, action) => {
        state.signing_up = false
        state.success_sign_up = false
        state.errors_sign_up =  action.payload
        
    })

     /* SIGN-IN */
     builder.addCase(SignIn.pending, (state, _) => {
        state.signing_in = true
      })
      builder.addCase(SignIn.fulfilled, (state, action) => {
          state.signing_in = false
          state.success_sign_in = true
          state.user = action.payload;
          state.token = action.payload.access_token
          localStorage.setItem('token', action.payload.access_token)
      })
      builder.addCase(SignIn.rejected, (state, action) => {
          state.token = null
          state.signing_in = false
          state.success_sign_in = false
          state.errors_sign_in = action.payload
      })

       /* SIGN-OUT */
      builder.addCase(SignOut.pending, (state, _) => {
        state.signing_out = true
      })
      builder.addCase(SignOut.fulfilled, (state, _) => {
          state.signing_out = false
          state.user = null;
          state.token = null
          localStorage.removeItem("token");
      })
      builder.addCase(SignOut.rejected, (state, _) => {
          state.token = null
          state.user = null;
          state.signing_out = false
      })

       /* Request Validated Forgot Password */
       builder.addCase(ValidateEmail.pending, (state, _) => {
        state.status_validate_email = 'loading';
      })
      builder.addCase(ValidateEmail.fulfilled, (state, action) => {
        state.status_validate_email = 'success';
      })
      builder.addCase(ValidateEmail.rejected, (state, action) => {
        state.status_validate_email = 'failed';
      })

      /* Request Sending Mail Forgot Password */
      builder.addCase(SendMailForgotPassword.pending, (state, _) => {
        state.status_forgot_password = 'loading';
      })
      builder.addCase(SendMailForgotPassword.fulfilled, (state, action) => {
        state.status_forgot_password = 'success';
      })
      builder.addCase(SendMailForgotPassword.rejected, (state, action) => {
        state.status_forgot_password = 'failed';
      })

      /* Request Validate Valid link for Reset Password */
      builder.addCase(ValidateExpirationDateResetPassword.pending, (state, _) => {
        state.status_validate_reset_password = 'loading';
      })
      builder.addCase(ValidateExpirationDateResetPassword.fulfilled, (state, action) => {
        state.reset_password_user_id = action.payload;
        state.status_validate_reset_password = 'success';
      })
      builder.addCase(ValidateExpirationDateResetPassword.rejected, (state, action) => {
        state.reset_password_error = action.payload
        state.status_validate_reset_password = 'failed';
      })

         /* Request Validate Valid link for Reset Password */
      builder.addCase(ResetingPassword.pending, (state, _) => {
        state.status_reset_password = 'loading';
      })
      builder.addCase(ResetingPassword.fulfilled, (state, action) => {
        state.status_reset_password = 'success';

      })
      builder.addCase(ResetingPassword.rejected, (state, action) => {
        state.status_reset_password = 'failed';
      })
  },

  
})

export const selectAuth = (state) => state.auth;
export default auth.reducer;
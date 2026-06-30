import React from 'react';
import LeftPane from '../components/leftPane.jsx';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

export default function SignupPage() {
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        fullname: Yup.string()
         .required('Full name is required')
         .min(3, 'Full name must be at least 3 characters'),
        email: Yup.string()
         .email('Invalid email address')
         .required('Email is required'),
        password: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const initialValues = {
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const onSubmit = async (values, { setSubmitting, setErrors }) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        name: values.fullname,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }
    );

    toast.success("Account created successfully!");

    console.log(res.data);

    navigate("/login");

  } catch (error) {
    const message =
      error.response?.data?.message || "Signup failed. Try again.";

    toast.error(message);

    // optional: still keep form error if needed
    setErrors({
      email: message,
    });

  } finally {
    setSubmitting(false);
  }
};
    

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-[#FAF8F2]">
      <LeftPane />

      <div className="flex flex-col justify-center min-h-screen w-full bg-[#FAF8F2] px-8 py-12 lg:w-1/2 text-left">
        <div className="max-w-md w-full mx-auto">
          
          <h2 className="font-serif text-[40px] font-normal text-[#1F2E22] leading-tight mb-2">
            Create your account
          </h2>
          <p className="text-[#6B7280] font-sans text-sm mb-8">
            Three free analyses to get you started — no credit card.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-5">
                
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="fullname" className="text-sm font-semibold text-[#1F2E22]">
                    Full name
                  </label>
                  <Field
                    type="text"
                    id="fullname"
                    name="fullname"
                    placeholder="Ali Khan"
                    className={`w-full px-4 py-3 bg-[#FAF8F2] border ${
                      touched.fullname && errors.fullname ? 'border-red-500' : 'border-[#EBE8E0]'
                    } rounded-[18px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.03),0_1px_3px_rgba(0,0,0,0.02)] focus:outline-none focus:border-[#42b47e] transition-colors text-[#1F2E22] placeholder-gray-400`}
                  />
                  <ErrorMessage name="fullname" component="span" className="text-xs text-red-500 pl-1" />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-[#1F2E22]">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="alikhan@gmail.com"
                    className={`w-full px-4 py-3 bg-[#FAF8F2] border ${
                      touched.email && errors.email ? 'border-red-500' : 'border-[#EBE8E0]'
                    } rounded-[18px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.03),0_1px_3px_rgba(0,0,0,0.02)] focus:outline-none focus:border-[#42b47e] transition-colors text-[#1F2E22] placeholder-gray-400`}
                  />
                  <ErrorMessage name="email" component="span" className="text-xs text-red-500 pl-1" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="password" className="text-sm font-semibold text-[#1F2E22]">
                      Password
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 bg-[#FAF8F2] border ${
                        touched.password && errors.password ? 'border-red-500' : 'border-[#EBE8E0]'
                      } rounded-[18px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.03),0_1px_3px_rgba(0,0,0,0.02)] focus:outline-none focus:border-[#42b47e] transition-colors text-[#1F2E22] placeholder-gray-400`}
                    />
                    <ErrorMessage name="password" component="span" className="text-xs text-red-500 pl-1" />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="confirmPassword" className="text-sm font-semibold text-[#1F2E22]">
                      Confirm Password
                    </label>
                    <Field
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 bg-[#FAF8F2] border ${
                        touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-[#EBE8E0]'
                      } rounded-[18px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.03),0_1px_3px_rgba(0,0,0,0.02)] focus:outline-none focus:border-[#42b47e] transition-colors text-[#1F2E22] placeholder-gray-400`}
                    />
                    <ErrorMessage name="confirmPassword" component="span" className="text-xs text-red-500 pl-1" />
                  </div>

                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3.5 bg-[#42b47e] text-white font-medium rounded-full hover:bg-[#39a06f] transition-colors focus:outline-none disabled:opacity-70 shadow-sm"
                  
                >
                  {isSubmitting ? 'Creating account...' : 'Create account'}
                </button>

              </Form>
            )}
          </Formik>

          <div className="mt-5 text-center space-y-4">
            <p className="text-xs text-[#6B7280]">
              By continuing, you agree to our Terms and Privacy
            </p>
            <p className="text-sm text-[#6B7280]">
              Already with us?{' '}
              <Link to="/login" className="text-[#42b47e] font-medium hover:underline ml-1">
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
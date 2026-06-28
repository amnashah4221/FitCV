import React from 'react';
import LeftPane from '../components/leftPane.jsx';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
    // Exact login validations
    const validationSchema = Yup.object({
        email: Yup.string()
         .email('Invalid email address')
         .required('Email is required'),
        password: Yup.string()
          .required('Password is required'),
    });

    const initialValues = {
        email: '',
        password: '',
    };

    const onSubmit = (values, { setSubmitting }) => {
        console.log('Login Form data', values);
        setSubmitting(false);
    };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-[#FAF8F2]">
      {/* Left branding pane */}
      <LeftPane />

      {/* Right side login form panel */}
      <div className="flex flex-col justify-center min-h-screen w-full bg-[#FAF8F2] px-8 py-12 lg:w-1/2 text-left">
        <div className="max-w-md w-full mx-auto">
          
          {/* Header Section */}
          <h2 className="font-serif text-[40px] font-normal text-[#1F2E22] leading-tight mb-2">
            Welcome back
          </h2>
          <p className="text-[#556153] font-sans text-sm mb-8">
            Sign in to keep tailoring your applications.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-5">
                
                {/* Email Field */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-[#1F2E22]">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@hello.com"
                    className={`w-full px-4 py-3 bg-[#FAF8F2] border ${
                      touched.email && errors.email ? 'border-red-500' : 'border-[#EBE8E0]'
                    } rounded-[18px] focus:outline-none focus:border-[#42b47e] transition-colors text-[#1F2E22] placeholder-gray-400`}
                  />
                  <ErrorMessage name="email" component="span" className="text-xs text-red-500 pl-1" />
                </div>

                {/* Password Field */}
                <div className="flex flex-col space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="text-sm font-semibold text-[#1F2E22]">
                      Password
                    </label>
                    <Link to="/forgot-password" className="text-xs text-[#556153] hover:text-[#42b47e] transition-colors">
                      Forgot?
                    </Link>
                  </div>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 bg-[#FAF8F2] border ${
                      touched.password && errors.password ? 'border-red-500' : 'border-[#EBE8E0]'
                    } rounded-[18px] focus:outline-none focus:border-[#42b47e] transition-colors text-[#1F2E22] placeholder-gray-400`}
                  />
                  <ErrorMessage name="password" component="span" className="text-xs text-red-500 pl-1" />
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3.5 bg-[#42b47e] text-white font-medium rounded-full hover:bg-[#39a06f] transition-colors focus:outline-none disabled:opacity-70"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>

              </Form>
            )}
          </Formik>

          {/* Or Divider Line */}
          <div className="relative flex py-5 items-center justify-center">
            <div className="flex-grow border-t border-[#EBE8E0]"></div>
            <span className="flex-shrink mx-4 text-xs text-[#6B7280] font-sans">or</span>
            <div className="flex-grow border-t border-[#EBE8E0]"></div>
          </div>

          {/* Continue as Guest Button */}
          <button
            type="button"
            className="w-full py-3.5 bg-transparent text-[#1F2E22] border border-[#EBE8E0] font-medium rounded-full hover:bg-[#FAF8F2]/50 transition-colors focus:outline-none"
            onClick={() => navigate('/demo')}
         >
            Continue as guest
          </button>

          {/* Bottom Info text & link */}
          <div className="mt-5 text-center space-y-4">
            <p className="text-xs text-[#6B7280]">
              Guest mode is for recruiters & a quick demo.
            </p>
            <p className="text-sm text-[#6B7280]">
              New here?{' '}
              <Link to="/signup" className="text-[#42b47e] font-medium hover:underline ml-1">
                Create an account
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
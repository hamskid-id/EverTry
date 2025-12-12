"use client";

import Link from "next/link";
import React from "react";
import AuthImage from "@/public/assets/Illustration.png";
import { Brand } from "../shared/Brand";
import { CustomImage } from "../shared/CustomImage";
import { cn } from "@/lib/utils";

interface IFooterText {
  footerText: string;
  footerLink: string;
  footerLinkTitle: string;
}

interface IAuthLayout extends Partial<IFooterText> {
  title?: string;
  description?: string;
  enableFooter?: boolean;
  children?: React.ReactNode;
}

const FooterText: React.FC<IFooterText> = ({
  footerText,
  footerLink,
  footerLinkTitle,
}) => (
  <p className="text-center text-[13px] sm:text-sm text-gray-400">
    {footerText}{" "}
    <Link
      href={footerLink}
      className="font-medium text-[#82DBF7] hover:text-primary-500 hover:underline transition-colors"
    >
      {footerLinkTitle}
    </Link>
  </p>
);

const AuthLayout: React.FC<IAuthLayout> = ({
  title = "Hi there, ....",
  description = "Get Started with Appointments.",
  enableFooter = true,
  children,
  footerText,
  footerLink,
  footerLinkTitle,
}) => {
  const showFooter =
    enableFooter && footerText && footerLink && footerLinkTitle;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#1a1a1a]">
      {/* Left Section - Form Area */}
      <div className="flex flex-col w-full lg:w-1/2 overflow-y-auto custom-scroll">
        <div className="flex flex-col min-h-full px-6 py-8 md:px-12 lg:px-16">
          {/* Brand Logo */}
          <div className="mb-12">
            <Brand style="h-[30px] w-[150px]" />
          </div>

          {/* Main Content - Centered */}
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="w-full max-w-[420px]">
              {/* Header */}
              {(title || description) && (
                <div className="mb-8">
                  {title && (
                    <h1 className="mb-2 text-[34px] md:text-[32px] font-medium text-white">
                      {title}
                    </h1>
                  )}
                  {description && (
                    <p className="text-sm md:text-base text-[#ABB8C4]">
                      {description}
                    </p>
                  )}
                </div>
              )}

              {/* Form Content */}
              <div>{children}</div>
            </div>
          </div>

          {/* Footer - Fixed at bottom */}
          {showFooter && (
            <div className="mt-auto  pb-2">
              <FooterText
                footerText={footerText}
                footerLink={footerLink}
                footerLinkTitle={footerLinkTitle}
              />
            </div>
          )}

          {/* Copyright Text - Bottom Left */}
          <div className={cn("pb-4", !showFooter && "mt-auto pt-8")}>
            <p className="text-left text-[12px] text-gray-500">
              @carepulse copyright
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Full Image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <CustomImage
          src={AuthImage}
          style="w-full h-full"
          imgStyle="object-cover rounded-l-[24px]"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

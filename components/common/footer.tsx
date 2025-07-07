import Image from "next/image";
import Link from "next/link";
import {
  MotionDiv,
  MotionSpan,
  MotionH3,
  MotionP,
} from "@/components/common/motion-wrapper";
import BgGradient from "@/components/common/bg-gradient";
import { Github, Instagram, Linkedin, Twitter, X } from "lucide-react"; // Make sure this is imported

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut" as const,
      },
    },
  };

  const linkVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <footer className="relative  overflow-hidden">
      {/* Background pattern */}
      {/* <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500" />
      </div> */}
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <MotionDiv
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
            {/* Left section - Profile and attribution */}
            <MotionDiv
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
              variants={itemVariants}
            >
              <div className="flex items-center gap-4">
                <MotionDiv
                  className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600 p-1 shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                    {/* <Image
                      src="/profile-image.jpg" // Replace with your actual image path
                      alt="ivruhs"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover rounded-full"
                    /> */}
                  </div>
                </MotionDiv>
                <div>
                  <MotionP
                    className="text-gray-800 font-medium text-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    Made by{" "}
                    <Link
                      href="/"
                      className="text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold"
                    >
                      IvRuHs
                    </Link>
                    <MotionSpan
                      className="text-orange-500 ml-2 inline-block"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      ❤️
                    </MotionSpan>
                  </MotionP>
                </div>
              </div>
              <MotionDiv
                className="text-gray-500 text-sm font-medium backdrop-blur-sm bg-white/20 px-3 py-1 rounded-full border border-white/20"
                variants={itemVariants}
              >
                © 2025 IvRuHs. All Rights Reserved.
              </MotionDiv>
            </MotionDiv>

            {/* Right section - Navigation links */}
            <MotionDiv className="w-full lg:w-auto" variants={itemVariants}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
                {/* About Section */}
                <MotionDiv variants={itemVariants}>
                  <MotionH3
                    className="text-gray-900 font-bold mb-6 uppercase tracking-wider text-sm relative"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    About
                    <MotionDiv
                      className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    />
                  </MotionH3>
                  <MotionDiv variants={linkVariants}>
                    <Link
                      href="/"
                      className="group text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm font-medium flex items-center gap-2"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        Contact
                      </span>
                      <MotionSpan
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ x: -5 }}
                        whileHover={{ x: 0 }}
                      >
                        →
                      </MotionSpan>
                    </Link>
                  </MotionDiv>
                </MotionDiv>

                {/* Products Section */}
                <MotionDiv variants={itemVariants}>
                  <MotionH3
                    className="text-gray-900 font-bold mb-6 uppercase tracking-wider text-sm relative"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Products
                    <MotionDiv
                      className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    />
                  </MotionH3>
                  <div className="space-y-3">
                    {[
                      {
                        name: "JobVector AI",
                        href: "https://job-vector.vercel.app/",
                      },
                      {
                        name: "Blog Webapp",
                        href: "https://ivruhs-writes-fqqr.vercel.app",
                      },
                      { name: "Sommario AI", href: "/" },
                      {
                        name: "Educational Website",
                        href: "https://udemyivruhs.netlify.app/",
                      },
                    ].map((item, index) => (
                      <MotionDiv
                        key={index}
                        variants={linkVariants}
                        custom={index}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href={item.href}
                          className="group block text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm font-medium flex items-center gap-2"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {item.name}
                          </span>
                          <MotionSpan
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ x: -5 }}
                            whileHover={{ x: 0 }}
                          >
                            →
                          </MotionSpan>
                        </Link>
                      </MotionDiv>
                    ))}
                  </div>
                </MotionDiv>

                {/* Connect Section */}
                <MotionDiv variants={itemVariants}>
                  <MotionH3
                    className="text-gray-900 font-bold mb-6 uppercase tracking-wider text-sm relative"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Connect
                    <MotionDiv
                      className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-transparent"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    />
                  </MotionH3>
                  <div className="space-y-3">
                    {[
                      {
                        name: "GitHub",
                        href: "https://github.com/ivruhs",
                        icon: <Github className="w-4 h-4" />,
                      },
                      {
                        name: "Instagram",
                        href: "https://instagram.com/ivruhs",
                        icon: <Instagram className="w-4 h-4" />,
                      },
                      {
                        name: "LinkedIn",
                        href: "https://www.linkedin.com/in/shubham-prasad-67b104324",
                        icon: <Linkedin className="w-4 h-4" />,
                      },
                      {
                        name: "Twitter",
                        href: "https://x.com/ivruhs",
                        icon: <X className="w-4 h-4" />,
                      },
                    ].map((item, index) => (
                      <MotionDiv
                        key={index}
                        variants={linkVariants}
                        custom={index}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href={item.href}
                          className="group block text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm font-medium flex items-center gap-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.icon}
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {item.name}
                          </span>
                          <MotionSpan
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ x: -5 }}
                            whileHover={{ x: 0 }}
                          >
                            →
                          </MotionSpan>
                        </Link>
                      </MotionDiv>
                    ))}
                  </div>
                </MotionDiv>
              </div>
            </MotionDiv>
          </div>
        </MotionDiv>
      </div>
    </footer>
  );
};

export default Footer;

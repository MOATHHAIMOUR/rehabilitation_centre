import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaRocket,
  FaChartLine,
  FaUsers,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTimes,
  FaPhone,
} from "react-icons/fa";

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const shapeVariants = {
  animate: {
    rotate: 360,
    transition: { duration: 20, repeat: Infinity, ease: "linear" },
  },
};

const LandingPage = () => {
  const { scrollY } = useScroll();

  // Contact Bar Visibility: Fades out on scroll down, appears on scroll up
  const contactBarY = useTransform(scrollY, [0, 100], [0, -35]);

  // Navbar Position: Starts lower, moves to top on scroll
  const navbarY = useTransform(scrollY, [75, 125], [30, 0]);

  return (
    <div>
      <div>
        {/* 🔹 Contact Bar (Hides on Scroll Down, Reappears on Scroll Up) */}
        <motion.div
          className="overflow-hidden fixed top-0 w-full bg-teal-900 text-white flex justify-between items-center px-8 py-2 text-sm shadow-md z-50"
          style={{ y: contactBarY }}
        >
          {/* Social Media Icons */}
          <div className="flex gap-4">
            <FaFacebookF className="cursor-pointer hover:text-blue-500 transition" />
            <FaInstagram className="cursor-pointer hover:text-pink-500 transition" />
            <FaTimes className="cursor-pointer hover:text-gray-400 transition" />
          </div>

          {/* Contact Details */}
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-400" />
              <span className="text-gray-300">info@eradah.org.sa</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-blue-400" />
              <span className="text-gray-300">0556164441</span>
            </div>
          </div>
        </motion.div>

        {/* 🔹 Main Navigation Bar (Moves to Top on Scroll) */}
        <motion.nav
          className="overflow-hidden fixed top-0 left-0 w-full bg-teal-950 text-white shadow-md z-40 flex justify-between items-center px-8 py-8 transition-all  opacity-90"
          style={{ y: navbarY }}
        >
          <div className="text-2xl font-bold tracking-wide">
            السحابة العالمية
          </div>
          <ul className="flex space-x-8 text-lg">
            <li className="hover:underline cursor-pointer transition">
              الرئيسية
            </li>
            <li className="hover:underline cursor-pointer transition">
              من نحن
            </li>
            <li className="hover:underline cursor-pointer transition">
              الخدمات
            </li>
            <li className="hover:underline cursor-pointer transition">
              تواصل معنا
            </li>
          </ul>
        </motion.nav>
      </div>

      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-teal-900 overflow-hidden">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/src/assets/images/Main.jpg')`, // Ensure correct path
            filter: "brightness(75%) contrast(1.2)", // Enhances clarity & contrast
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />

        {/* Background Shapes */}
        <motion.div
          className="absolute top-10 left-10 w-40 h-40 bg-teal-700 opacity-20 rounded-full"
          variants={shapeVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-20 right-20 w-60 h-60 bg-teal-500 opacity-20 rounded-full"
          variants={shapeVariants}
          animate="animate"
        />

        {/* Hero Section with Background Image */}
        <div className="relative flex flex-col items-center justify-center h-screen text-center text-white px-6">
          <motion.h1
            className="text-6xl font-bold mb-4 z-20"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            مرحبًا بك في السحابة العالمية
          </motion.h1>
          <motion.p
            className="text-xl mb-6 max-w-2xl z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            نحن هنا لمساعدتك في بناء مستقبل أفضل من خلال برامج التأهيل النفسي
            والإرشاد الأسري.
          </motion.p>
          <motion.button
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg z-20 transition transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            استكشف المزيد
          </motion.button>
        </div>

        {/* Why Choose Us Section */}
        <div className="relative z-40 py-16 px-6 bg-teal-900">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            لماذا نحن؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1: Glassmorphism */}
            <motion.div
              className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg text-center border border-teal-400"
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <FaChartLine className="text-teal-300 text-4xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                نتائج ملموسة
              </h3>
              <p className="text-gray-300">
                خدماتنا تقدم نتائج حقيقية ومستدامة للأفراد والعائلات.
              </p>
            </motion.div>

            {/* Card 2: Floating Effect */}
            <motion.div
              className="bg-gradient-to-r from-teal-700 to-gray-900 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition"
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <FaRocket className="text-teal-300 text-4xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                أحدث التقنيات
              </h3>
              <p className="text-gray-300">
                نستخدم الذكاء الاصطناعي وأحدث التقنيات لتحسين جودة الحياة.
              </p>
            </motion.div>

            {/* Card 3: Interactive 3D */}
            <motion.div
              className="bg-gray-800 p-6 rounded-lg border-2 border-teal-500 text-center transform hover:scale-110 transition"
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <FaUsers className="text-teal-300 text-4xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                خبرة عالمية
              </h3>
              <p className="text-gray-300">
                لدينا خبراء محترفين في التأهيل النفسي والإرشاد الأسري.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

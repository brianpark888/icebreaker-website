import Link from "next/link";

interface BackButtonProps {
    path?: string;
    displayString?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ path="#", displayString }) => {
  return (
        <Link href={path} className="absolute top-4 left-4 text-sm flex items-center gap-2 text-gray-300 hover:text-white transition cursor-pointer ">
          <svg
            className="w-5 h-5 transition-transform hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to {displayString}
        </Link>
  );
};

export default BackButton;

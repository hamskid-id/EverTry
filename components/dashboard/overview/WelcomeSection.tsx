interface WelcomeSectionProps {
  userName: string;
  greeting?: string;
}

export const WelcomeSection = ({
  userName,
  greeting = "Start day with managing new appointments",
}: WelcomeSectionProps) => {
  return (
    <div className="mb-8">
      <h1 className="sm:text-3xl text-xl font-semibold mb-2">Welcome, {userName}</h1>
      <p className="text-[#ABB8C4] text-sm sm:text-base">{greeting}</p>
    </div>
  );
};

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
      <h1 className="text-3xl font-semibold mb-2">Welcome, {userName}</h1>
      <p className="text-[#ABB8C4]">{greeting}</p>
    </div>
  );
};

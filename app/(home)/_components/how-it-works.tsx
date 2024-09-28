import { Share2, Filter, GitBranch, LucideIcon } from 'lucide-react';

const steps = [
  {
    step: '01',
    Icon: Share2,
    title: 'Collect Feedback',
    description:
      'Share your board with users and let them submit feedback directly.',
  },
  {
    step: '02',
    Icon: Filter,
    title: 'Analyze & Prioritize',
    description:
      'Use intuitive dashboards to filter, analyze, and prioritize based on user upvotes.',
  },
  {
    step: '03',
    Icon: GitBranch,
    title: 'Build & Iterate',
    description:
      'Create a development roadmap and continuously improve your product.',
  },
];

const HowItWorks = () => {
  return (
    <section className="max-w-screen-xl w-full mx-auto py-10 px-3 lg:py-20 lg:px-16">
      <h2 className="text-center text-3xl md:text-5xl font-bold font-title max-w-[680px] mx-auto leading-[1.15] md:leading-[1.15]">
        How It Works: From Feedback to Action
      </h2>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {steps.map((step) => (
          <Step key={step.step} {...step} />
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

const Step = ({
  step,
  Icon,
  title,
  description,
}: {
  step: string;
  Icon: LucideIcon;
  title: string;
  description: string;
}) => {
  return (
    <div className="relative overflow-hidden bg-white p-6 rounded-sm ring-1 ring-inset ring-gray-800/10">
      <span className="select-none text-7xl font-black absolute -top-2.5 -right-2.5 text-muted-foreground opacity-10 font-title">
        {step}
      </span>
      <div className="inline-flex items-center justify-center rounded-full p-1.5 w-8 h-8 ring-1 ring-inset ring-gray-800/10">
        <Icon className="text-violet-700 w-4 h-4" strokeWidth={1.75} />
      </div>
      <h3 className="font-medium text-lg mt-3">{title}</h3>
      <p className="text-muted-foreground text-sm mt-3">{description}</p>
    </div>
  );
};

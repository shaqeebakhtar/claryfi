import Image from 'next/image';

const Features = () => {
  return (
    <section className="max-w-screen-xl w-full mx-auto py-10 px-3 lg:py-16 lg:px-16">
      <h2 className="text-center text-3xl md:text-5xl font-bold font-title max-w-[820px] mx-auto leading-[1.15] md:leading-[1.15]">
        Build Better Products by Listening to Your Customers
      </h2>
      <p className="md:text-lg md:leading-6 text-center text-muted-foreground mx-auto max-w-[680px] mt-4">
        Claryfi help you turn customer&apos;s feedback into action and make
        better decisions that drive growth.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-11 grid-rows-2 gap-3 mt-10">
        <div className="flex flex-col justify-start gap-5 bg-gray-50 w-full md:col-span-6 rounded-md ring-1 ring-inset ring-gray-800/5 p-4">
          <div className="relative rounded-md overflow-hidden">
            <div className="absolute left-0 bottom-0 right-0 h-20 bg-gradient-to-b from-gray-50/5 to-gray-100" />
            <Image
              alt="Feature Image"
              draggable="false"
              className="w-full object-cover bg-center rounded-sm aspect-video"
              height="100"
              src="/placeholder.svg"
              width="100"
            />
          </div>
          <div className="space-y-1">
            <h4 className="font-title text-lg leading-6 font-semibold">
              Collect Feedbacks in One place
            </h4>
            <p className="text-sm text-muted-foreground">
              Gather feedbacks from your users and keep everything in one place.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-5 bg-gray-50 w-full md:col-span-5 rounded-md ring-1 ring-inset ring-gray-800/5 p-4">
          <div className="relative rounded-md overflow-hidden">
            <div className="absolute left-0 bottom-0 right-0 h-20 bg-gradient-to-b from-gray-50/5 to-gray-100" />
            <Image
              alt="Feature Image"
              draggable="false"
              className="w-full object-cover bg-center rounded-sm aspect-video md:aspect-[3/2.05]"
              height="100"
              src="/placeholder.svg"
              width="100"
            />
          </div>
          <div className="space-y-1">
            <h4 className="font-title text-lg leading-6 font-semibold">
              Prioritize What Matters Most
            </h4>
            <p className="text-sm text-muted-foreground">
              Prioritize feature requests by user votes.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-5 bg-gray-50 w-full md:col-span-5 rounded-md ring-1 ring-inset ring-gray-800/5 p-4">
          <div className="relative rounded-md overflow-hidden">
            <div className="absolute left-0 bottom-0 right-0 h-20 bg-gradient-to-b from-gray-50/5 to-gray-100" />
            <Image
              alt="Feature Image"
              draggable="false"
              className="w-full object-cover bg-center rounded-sm aspect-video md:aspect-[3/2.05]"
              height="100"
              src="/placeholder.svg"
              width="100"
            />
          </div>
          <div className="space-y-1">
            <h4 className="font-title text-lg leading-6 font-semibold">
              Keep Customers in the Loop
            </h4>
            <p className="text-sm text-muted-foreground">
              Let your customers know them their feedback is being put into
              action.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-5 bg-gray-50 w-full md:col-span-6 rounded-md ring-1 ring-inset ring-gray-800/5 p-4">
          <div className="relative rounded-md overflow-hidden">
            <div className="absolute left-0 bottom-0 right-0 h-20 bg-gradient-to-b from-gray-50/5 to-gray-100" />
            <Image
              alt="Feature Image"
              draggable="false"
              className="w-full object-cover bg-center rounded-sm aspect-video"
              height="100"
              src="/placeholder.svg"
              width="100"
            />
          </div>
          <div className="space-y-1">
            <h4 className="font-title text-lg leading-6 font-semibold">
              Discuss and Refine Ideas
            </h4>
            <p className="text-sm text-muted-foreground">
              Empower your users to discuss and collaborate on feedback.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

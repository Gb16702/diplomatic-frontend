import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import { PricingCard, PricingCardIllustration, PricingCardHeader, PricingCardFeatures, PricingCardBottom } from "@/components/ui/pricing-card";
import { CheckIcon } from "@/components/ui/check-icon";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">

      <div className="w-full flex justify-center">
        <section className="h-[62vh] w-full max-w-[1280px] flex justify-between items-center px-10 pt-[100px]">
          <div className="w-1/2">
            <h1 className="text-5xl font-medium font-serif leading-[70px]">
              Master Negotiation, <br />Diplomacy and Influence.
            </h1>
            <h2 className="mt-6 text-base font-normal text-gray-dark leading-relaxed">
              Learn from the greatest minds. Train through real challenges. Level up your power, one decision at a time.
            </h2>
            <div className="mt-10">
              <Button variant="contained-secondary" size="lg" shadow="black" className="w-[250px]">
                Start Your Journey
              </Button>
              <h3 className="mt-10 text-xl font-normal font-serif italic">
                The gamification of wisdom
              </h3>
            </div>
          </div>
          
          <div className="w-1/2 flex justify-end">
            <Image
              src="/images/illustrations/Group 1335.png"
              alt="Hero illustration"
              width={500}
              height={400}
              className="object-contain"
            />
          </div>
        </section>
      </div>

      <div className="w-full flex justify-center">
        <section className="w-full max-w-[1280px] mt-[100px] min-h-[300px] flex items-center justify-between gap-6 px-10">
          <FeatureCard
            title="Choose your master"
            icon="/images/features/ChatGPT Image Apr 27, 2025, 09_47_50 PM 2.png"
            description="Sun Tzu. Machiavelli. Harvard. Kissinger. The UN. Each path reveals unique strategies."
          />
          <FeatureCard
            title="Face Real World Challenges"
            icon="/images/features/Screenshot 2025-04-27 at 22.03.41 1.png"
            description="Negotiate deals, resolve conflicts, influence outcomes. Prefab options + Open field to test your thinking."
          />
          <FeatureCard
            title="Learn faster by Doing"
            icon="/images/features/ChatGPT Image Apr 27, 2025, 09_45_03 PM 2.png"
            description="AI-powered feedback after every challenge. Improve your offence, defence, and overall emotional intelligence."
          />
        </section>
      </div>

      <div className="w-full flex justify-center">
        <section className="h-[80vh] w-full max-w-[1280px] flex items-center justify-between p-10">
          <div className="flex flex-col gap-3 items-start justify-start">
            <div className="flex items-center justify-center flex-col">
              <Image
                src="/images/illustrations/marcus-aurelius.png"
                alt="Marcus Aurelius"
                width={320}
                height={320}
                className="object-contain"
              />
              <h2 className="w-[350px] m-0 text-2xl leading-[30px] font-serif font-medium text-center mt-6">
                You have power over your mind, not outside events. Realise this, and you will find strength.
              </h2>
              <h3 className="font-serif font-normal text-xl italic mt-[30px]">
                Marcus Aurelius
              </h3>
            </div>
          </div>

          <div className="w-[40%]">
            <h2 className="text-4xl leading-[50px] font-medium font-serif m-0">
              Train like a strategist.<br /> Think like a philosopher.
            </h2>
            <h3 className="text-base leading-[30px] font-normal text-gray-dark mt-5 mb-0">
              Challenge yourself. Sharpen your mind. Master the strategies that shaped empires, and build your own future.
            </h3>
            
            <div className="mt-6 flex flex-col gap-[18px]">
              <div className="flex items-center gap-[18px]">
                <CheckIcon variant="circle" stroke="#fcf7ee" />
                <span className="text-sm text-gray-dark">Learn from Legends</span>
              </div>
              <div className="flex items-center gap-[18px]">
                <CheckIcon variant="circle" stroke="#fcf7ee" />
                <span className="text-sm text-gray-dark">Gamified Mastery</span>
              </div>
              <div className="flex items-center gap-[18px]">
                <CheckIcon variant="circle" stroke="#fcf7ee" />
                <span className="text-sm text-gray-dark">Real-Time AI Feedback</span>
              </div>
              <div className="flex items-center gap-[18px]">
                <CheckIcon variant="circle" stroke="#fcf7ee" />
                <span className="text-sm text-gray-dark">Sharable Achievements</span>
              </div>
            </div>

            <div className="mt-10">
              <Button variant="contained-secondary" size="lg" shadow="black" className="w-[250px]">
                Test your skills
              </Button>
            </div>
          </div>
        </section>
      </div>

      <div className="w-full bg-cream-lighter">
        <section className="w-full min-h-screen px-10 py-20 flex flex-col items-center gap-10">
          <div className="text-center">
            <h2 className="text-4xl font-medium leading-[50px] font-serif">
              Start Your Journey into Mastery
            </h2>
            <h3 className="font-normal text-base leading-[30px] text-gray-dark mt-5 text-center">
              One challenge at a time.
            </h3>
          </div>

          <div className="flex justify-between items-stretch w-full max-w-[1280px] gap-[60px] flex-1">
            <PricingCard>
              <PricingCardIllustration>
                <Image
                  src="/images/illustrations/sun-tzu.svg"
                  alt="General Sun Tzu"
                  width={120}
                  height={100}
                  className="object-contain h-40"
                />
              </PricingCardIllustration>

              <PricingCardHeader>
                <h2 className="text-2xl font-serif font-medium m-0">General</h2>
                <p className="text-sm m-0 text-gray-dark">
                  Begin your journey to mastery with General Sun Tzu.
                </p>
              </PricingCardHeader>

              <PricingCardFeatures>
                <ul className="list-none p-0 m-0 flex flex-col gap-2 text-left">
                  <li className="flex items-center gap-6">
                    <CheckIcon stroke="#7a9785" />
                    <span className="text-gray-dark text-sm">Access to first 3 challenges</span>
                  </li>
                  <li className="flex items-center gap-6">
                    <CheckIcon stroke="#7a9785" />
                    <span className="text-gray-dark text-sm">Basic AI feedback</span>
                  </li>
                  <li className="flex items-center gap-6">
                    <CheckIcon stroke="#7a9785" />
                    <span className="text-gray-dark text-sm">Learn from Sun Tzu</span>
                  </li>
                </ul>
              </PricingCardFeatures>

              <PricingCardBottom>
                <div className="flex flex-col items-center gap-4">
                  <div className="font-serif font-medium text-2xl leading-[30px] text-center">
                    Free
                  </div>
                  <Button variant="outlined-secondary" className="w-[180px]">
                    Select
                  </Button>
                </div>
              </PricingCardBottom>
            </PricingCard>

            <PricingCard>
              <PricingCardIllustration>
                <Image
                  src="/images/illustrations/diplomate_pricing_2.svg"
                  alt="Regal"
                  width={220}
                  height={100}
                  className="object-contain h-40"
                />
              </PricingCardIllustration>

              <PricingCardHeader>
                <h2 className="text-2xl font-serif font-medium m-0">Regal</h2>
                <p className="text-sm m-0 text-gray-dark">
                  Train like Kings & Queens, negotiate like legends.
                </p>
              </PricingCardHeader>

              <PricingCardFeatures>
                <ul className="list-none p-0 m-0 flex flex-col gap-2 text-left">
                  <li className="flex items-center gap-6">
                    <CheckIcon stroke="#7a9785" />
                    <span className="text-gray-dark text-sm">Unlimited challenges</span>
                  </li>
                  <li className="flex items-center gap-6">
                    <CheckIcon stroke="#7a9785" />
                    <span className="text-gray-dark text-sm">AI feedback loop</span>
                  </li>
                  <li className="flex items-center gap-6">
                    <CheckIcon stroke="#7a9785" />
                    <span className="text-gray-dark text-sm">Build XP and grow your profile</span>
                  </li>
                  <li className="flex items-center gap-6">
                    <CheckIcon stroke="#7a9785" />
                    <span className="text-gray-dark text-sm">Unlock badges</span>
                  </li>
                  <li className="flex items-center gap-6">
                    <CheckIcon stroke="#7a9785" />
                    <span className="text-gray-dark text-sm">Learn from Kings and Queens</span>
                  </li>
                  <li className="flex items-center gap-6">
                    <CheckIcon stroke="#7a9785" />
                    <span className="text-gray-dark text-sm">Answering speed measured</span>
                  </li>
                </ul>
              </PricingCardFeatures>

              <PricingCardBottom>
                <div className="flex flex-col items-center gap-4">
                  <div className="font-serif font-medium text-2xl leading-[30px] text-center">
                    <div>€8/mo</div>
                    <div className="text-lg">€80/year</div>
                  </div>
                  <Button variant="outlined-secondary" className="w-[180px]">
                    Select
                  </Button>
                </div>
              </PricingCardBottom>
            </PricingCard>

            <PricingCard isHighlighted>
              <PricingCardIllustration>
                <Image
                  src="/images/illustrations/diplomate_pricing_3.svg"
                  alt="Diplomat"
                  width={220}
                  height={100}
                  className="object-contain h-40"
                />
              </PricingCardIllustration>

              <PricingCardHeader>
                <h2 className="text-2xl font-serif font-medium m-0">Diplomat</h2>
                <p className="text-sm m-0 text-gray-dark">
                  Learn from iconic leaders and famous tacticians to navigate any situation.
                </p>
              </PricingCardHeader>

              <PricingCardFeatures>
                <ul className="list-none p-0 m-0 flex flex-col gap-2 text-left">
                  <li className="flex items-center gap-6">
                    <CheckIcon stroke="#7a9785" />
                    <span className="text-gray-dark text-sm">Everything in Regal</span>
                  </li>
                  <li className="flex items-center gap-6">
                    <CheckIcon stroke="#7a9785" />
                    <span className="text-gray-dark text-sm">Advanced scenario's</span>
                  </li>
                  <li className="flex items-center gap-6">
                    <CheckIcon stroke="#7a9785" />
                    <span className="text-gray-dark text-sm">Crisis situations</span>
                  </li>
                  <li className="flex items-center gap-6">
                    <CheckIcon stroke="#7a9785" />
                    <span className="text-gray-dark text-sm">Learn from UN Protocols</span>
                  </li>
                  <li className="flex items-center gap-6">
                    <CheckIcon stroke="#7a9785" />
                    <span className="text-gray-dark text-sm">Learn from Harvard B.S.</span>
                  </li>
                  <li className="flex items-center gap-6">
                    <CheckIcon stroke="#7a9785" />
                    <span className="text-gray-dark text-sm">Learn Power & Mastery laws</span>
                  </li>
                </ul>
              </PricingCardFeatures>

              <PricingCardBottom>
                <div className="flex flex-col items-center gap-4">
                  <div className="font-serif font-medium text-2xl leading-[30px] text-center">
                    <div>€12/mo</div>
                    <div className="text-lg">€120/year</div>
                  </div>
                  <Button variant="contained" shadow="orange" className="w-[180px]">
                    Select
                  </Button>
                </div>
              </PricingCardBottom>
            </PricingCard>
          </div>
        </section>
      </div>

      <div className="bg-black">
        <section className="h-[58vh] w-full flex justify-center items-center px-10 py-20">
          <div className="max-w-[1280px] w-full h-full flex items-center justify-between gap-6">
            <div className="w-1/2 h-full flex justify-start items-center">
              <div className="w-fit h-full flex relative after:content-[''] after:absolute after:inset-0 after:shadow-[inset_0_4px_80px_96px_#040402] after:pointer-events-none">
                <Image
                  src="/images/illustrations/diplomate-banner.png"
                  alt="Diplomate AI"
                  width={400}
                  height={300}
                  className="object-contain h-full relative"
                />
              </div>
            </div>

            <div className="w-1/2 h-full flex justify-between items-start flex-col">
              <div>
                <h1 className="text-[50px] text-cream font-serif">
                  Learn from the Masters. <br />
                  Become a Master.
                </h1>
                <h3 className="font-normal text-xl text-cream mt-5">
                  *Without having to read <strong>all</strong> of their books.
                </h3>
              </div>
              <div className="w-full flex justify-end">
                <Image
                  src="/logo/logo-cream.svg"
                  alt="Diplomate.ai"
                  width={160}
                  height={32}
                  className="mt-20"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-background">
        <section className="min-h-[60vh] w-full flex justify-center">
          <div className="w-full max-w-[1280px] flex flex-col gap-[72px] px-10 py-20">
            <div className="flex flex-col items-center justify-center gap-6">
              <h2 className="text-4xl font-medium leading-[50px] font-serif">
                The gamification of wisdom
              </h2>
              <p className="text-center text-gray-dark">
                Diplomate.AI is trained with the knowledge of reputable sources and experiences. <br /> Combined with a personalised approach to accommodate  accessible self-development for all.
              </p>
            </div>

            <div className="w-full h-[300px]">

            </div>

            <div className="flex items-center justify-center flex-col">
              <p className="font-serif text-2xl leading-[30px] text-center font-medium">
                "A powerful way to build negotiation skills, sharpen critical thinking, <br /> and connect with the wisdom of the past."
              </p>
              <p className="text-base font-normal mt-4 text-gray-dark">
                J.B. - Founder of Diplomate.AI
              </p>
              <div className="mt-10">
                <Button variant="contained-secondary" size="lg" shadow="black" className="w-[250px]">
                  Start your journey
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="relative w-full min-h-[60vh] flex justify-center items-center px-10 py-20">
        <div className="absolute bottom-0 transform translate-y-1/2 w-[1000px] h-[230px] bg-background rounded-lg shadow-lg flex justify-between p-[20px_60px]">
          <div className="h-full pt-5 flex flex-col justify-between gap-4">
            <h3 className="font-serif font-medium text-4xl leading-[45px]">
              Invite 3 friends and <br /> unlock a 15% discount*
            </h3>
            <p className="text-gray-dark">
              Because learning together is more fun than learning alone.
            </p>
            <p className="text-xs text-gray-dark">
              *only applicable on yearly subscriptions.
            </p>
          </div>
          <div className="flex items-center h-full">
            <Button variant="contained" size="lg" shadow="orange" className="w-[250px]">
              Invite now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { HomeApplication, HomeBelief, HomeFlow, HomeHero, HomeSession, HomeStory } from '@/components/home-sections';

export default function Home() {
  return (
    <main id="main-content">
      <HomeHero />
      <HomeStory />
      <HomeSession />
      <HomeBelief />
      <HomeFlow />
      <HomeApplication />
    </main>
  );
}

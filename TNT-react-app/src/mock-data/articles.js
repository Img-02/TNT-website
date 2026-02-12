import { genres } from "./genres"
import { status } from "./status"

export const articles = [
    {
      id: 1,
      title: "Cannon discovered in Derbyshire Field. Peasants deny all knowledge",
      publishedAt: "2026-02-02T14:35:12.345Z",
      genre: [genres[0], genres[1]],
      summary: "A Middle Ages cannon was discovered in the Derbyshire Dales District",
      text: "More text about our very interesting first article",
      isBreaking: false,
      status: status[3],
      rating: 5,
      image: "/article-images/article1.jpg"
    },
{
      id: 2,
      title: "Planking: is your child at risk?",
      publishedAt: "2026-02-02T14:35:12.345Z",
      genre: [genres[2], genres[3]],
      summary: "Explore the risks of todays latest youth trends",
      text: "A man has died in Australia after taking part in the internet phenomenon of planking. But what is it and where did the craze come from?The victim, a man in his 20s, fell from a balcony railing in Brisbane while a friend photographed him, according to police. The phenomenon of planking involves lying face down in a public place - the stranger the better - and posting photos on social networking sites such as Facebook. Aficionados lie expressionless with a straight body, hands by their sides and toes pointing into the ground. Two groups claim to have invented the prank - either in Somerset in 2000 as the lying down game or eight years later in South Australia as planking. Both groups have rival Facebook sites boasting more than 100,000 fans.",
      isBreaking: true,
      status: status[3],
      rating: 9,
      image: "/article-images/plank.jpg"
    },
    {
      id: 3,
      title: "LISAs: Not just a simpson character",
      publishedAt: "2026-02-02T14:35:12.345Z",
      genre: [genres[3], genres[4]],
      summary: "How a LISA can help you buy your first home with government D'oh!",
      text: "More text about our very interesting third article",
      isBreaking: false,
      status: status[3],
      rating: 2,
      image: "/article-images/stonks_will.jpg"
    },
{
      id: 4,
      title: "Why your 67th birthday will make your grandkids love you",
      publishedAt: "2026-02-02T14:35:12.345Z",
      genre: [genres[6], genres[7]],
      summary: "67 is the new it number, we speak to sponsor Darshan McCarLover to find out more",
      text: "More text about our very interesting fourth article",
      isBreaking: false,
      status: status[3],
      rating: 6,
      image: "/article-images/oldman.jpg"
    },
{
      id: 5,
      title: "Can't hit your protein? Doctor Will weighs in",
      publishedAt: "2026-02-02T14:35:12.345Z",
      genre: [genres[2], genres[3]],
      summary: "6000 BOMBOCLAT CHICKEN NUGGETS",
      text: "More text about our very interesting fifth article",
      isBreaking: false,
      status: status[3],
      rating: 5,
      image: "/article-images/doctor_will.png"
    }, 
{
      id: 6,
      title: "Harry Styles new album inspires Russian Revolution-esque revolt in all-girls Grammar School",
      publishedAt: "2026-02-02T14:35:12.345Z",
      genre: [genres[2], genres[3]],
      summary: "Mr Style's new album 'Aperture' has sent this London school into total anarchy as teachers are chased out with molotovs",
      text: "More text about our very interesting sixth article",
      isBreaking: false,
      status: status[3],
      rating: 5,
      image: "article-images/harry.png"
    },
    {
      id: 7,
      title: "TikTok to be renamed Hickory Dickory Tikory Tokory in the UK",
      publishedAt: "2026-02-02T14:35:12.345Z",
      genre: [genres[2], genres[3]],
      summary: "TikTok, reels, shorts and an appeal to british values",
      text: "More text about our very interesting seventh article",
      isBreaking: false,
      status: status[3],
      rating: 9,
      image: "/article-images/stressed_goon.png"
    },
    {
      id: 8,
      title: "Wall St Crash more like Wall St Bash!",
      publishedAt: "2026-02-02T14:35:12.345Z",
      genre: [genres[3], genres[4]],
      summary: "Buy into Trading 212 today!",
      text: "More text about our very interesting eighth article",
      isBreaking: true,
      status: status[3],
      rating: 2,
      image: "/article-images/wallstcrash.jpg"
    },
{
      id: 9,
      title: "Prime Minister of New Zealand celebrates 21st birthday",
      publishedAt: "2026-02-02T14:35:12.345Z",
      genre: [genres[6], genres[7]],
      summary: "Colin McNewZealand celebrates his 21st birthday surrounded by friends and family",
      text: "More text about our very interesting ninth article",
      isBreaking: false,
      status: status[3],
      rating: 6,
      image: "/article-images/colin.png"
    },
{
      id: 10,
      title: "Try this weird victorian trick to get your baby to sleep",
      publishedAt: "2026-02-02T14:35:12.345Z",
      genre: [genres[2], genres[3]],
      summary: "Move over Pampers, time to try arsenic!",
      text: "More text about our very interesting tenth article",
      isBreaking: false,
      status: status[3],
      rating: 5,
      image: "/article-images/babyarsenic.jpg"
    }, 
{
      id:11,
      title: "Watermelon sugar is a euphemism but what for?",
      publishedAt: "2026-02-02T14:35:12.345Z",
      genre: [genres[2], genres[3]],
      summary: "Tastes like strawberries? Not so much",
      text: "More text about our very interesting sixth article",
      isBreaking: false,
      status: status[3],
      rating: 5,
      image: "article-images/kirby.jpg"
    }
]



        {/* <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/blog/:id" element={<BlogPost />} />

          <Route path="/about" element={<About />} />

          <Route path="*" element={<NotFound />} />
        </Routes> */}

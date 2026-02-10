import { genres } from "./genres"
import { status } from "./status"

export const articles = [
    {
      id: 1,
      title: "Instructor astonished as students perform beyond expectations",
      publishedAt: "2026-02-02T14:35:12.345Z",
      genre: [genres[0], genres[1]],
      summary: "Tech instructor ventures into uncharted territory with excelling pupils",
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
      summary: "Explore the risks of todays latest youth trends and are hand phones the beginning of the end",
      text: "More text about our very interesting second article",
      isBreaking: true,
      status: status[3],
      rating: 9,
      image: "/article-images/stressed_goon.png"
    },
    {
      id: 3,
      title: "LISAs: Not just a simpson character",
      publishedAt: "2026-02-02T14:35:12.345Z",
      genre: [genres[3], genres[4]],
      summary: "How a LISA can help you buy your first home with government D'oh!",
      text: "More text about our very interesting third article",
      isBreaking: true,
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
      image: "/article-images/colin.png"
    },
{
      id: 5,
      title: "Can't hit your protein? Try this one weird trick!",
      publishedAt: "2026-02-02T14:35:12.345Z",
      genre: [genres[2], genres[3]],
      summary: "6000 CHICKEN NUGGETS",
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
    }
]



        {/* <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/blog/:id" element={<BlogPost />} />

          <Route path="/about" element={<About />} />

          <Route path="*" element={<NotFound />} />
        </Routes> */}

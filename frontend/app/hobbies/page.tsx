import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EnhancedBackground } from "@/components/enhanced-background"
import { TypingEffect } from "@/components/typing-effect"
import Image from "next/image"

interface HobbyItem {
  title: string
  description: string
  image: string
  tags?: string[]
  releaseYear?: number
}

export default function HobbiesPage() {
  const games: HobbyItem[] = [
    {
      title: "Outer Wilds",
      description: "A mind-bending exploration game about unraveling the mysteries of a time-looped solar system.",
      image: "/personal-website/hobbies/outer-wilds.jpg",
      tags: ["Exploration", "Mystery", "Sci-Fi"],
      releaseYear: 2019,
    },
    {
      title: "Hollow Knight",
      description: "A beautifully crafted Metroidvania set in a haunting, atmospheric underground world.",
      image: "/personal-website/hobbies/hollow-knight.jpg",
      tags: ["Metroidvania", "Action", "Indie"],
      releaseYear: 2017,
    },
    {
      title: "OMORI",
      description: "A psychological RPG that explores memory, identity, and trauma through surreal storytelling.",
      image: "/personal-website/hobbies/omori.avif",
      tags: ["RPG", "Psychological", "Indie"],
      releaseYear: 2020,
    },
    {
      title: "Terraria",
      description: "A sandbox adventure game with crafting, exploration, and massive boss fights.",
      image: "/personal-website/hobbies/terraria.png",
      tags: ["Sandbox", "Crafting", "Adventure"],
      releaseYear: 2011,
    },
    {
      title: "Don't Starve Together",
      description: "A multiplayer survival game filled with strange creatures, dark nights, and harsh environments.",
      image: "/personal-website/hobbies/dont-starve-together.avif",
      tags: ["Survival", "Multiplayer", "Stylized"],
      releaseYear: 2016,
    },
    {
      title: "Shovel Knight",
      description: "A retro-inspired action platformer with tight gameplay and charming pixel art.",
      image: "/personal-website/hobbies/shovel-knight.avif",
      tags: ["Platformer", "Retro", "Indie"],
      releaseYear: 2014,
    },
  ]

  const movies: HobbyItem[] = [
    {
      title: "The Dark Knight",
      description: "A gritty and emotional superhero film exploring justice, chaos, and morality.",
      image: "/personal-website/hobbies/dark-knight.jpg",
      tags: ["Action", "Superhero", "Drama"],
      releaseYear: 2008,
    },
    {
      title: "The Departed",
      description: "An intense crime thriller about identity, loyalty, and deception.",
      image: "/personal-website/hobbies/the-departed.jpg",
      tags: ["Crime", "Thriller", "Drama"],
      releaseYear: 2006,
    },
    {
      title: "Inception",
      description: "A dream-bending sci-fi thriller that dives deep into layers of the subconscious.",
      image: "/personal-website/hobbies/inception.jpg",
      tags: ["Sci-Fi", "Action", "Psychological"],
      releaseYear: 2010,
    },
    {
      title: "A Silent Voice",
      description: "A beautifully animated story about bullying, redemption, and forgiveness.",
      image: "/personal-website/hobbies/a-silent-voice.avif",
      tags: ["Drama", "Anime", "Emotional"],
      releaseYear: 2016,
    },
    {
      title: "Snowpiercer",
      description: "A post-apocalyptic train ride through class warfare, survival, and revolution.",
      image: "/personal-website/hobbies/snowpiercer.jpg",
      tags: ["Sci-Fi", "Thriller", "Dystopia"],
      releaseYear: 2013,
    },
    {
      title: "Howl's Moving Castle",
      description: "A magical journey through a whimsical world of love, war, and transformation.",
      image: "/personal-website/hobbies/howls-moving-castle.jpg",
      tags: ["Fantasy", "Anime", "Adventure"],
      releaseYear: 2004,
    },
  ]

  const manga: HobbyItem[] = [
    {
      title: "Berserk",
      description: "A dark fantasy epic exploring trauma, revenge, and fate through unforgettable art.",
      image: "/personal-website/hobbies/berserk.jpeg",
      tags: ["Dark Fantasy", "Violence", "Tragedy"],
    },
    {
      title: "Slam Dunk",
      description: "A sports manga with humor, character growth, and iconic basketball moments.",
      image: "/personal-website/hobbies/slam-dunk.jpg",
      tags: ["Sports", "Coming-of-Age", "Classic"],
    },
    {
      title: "Chainsaw Man",
      description: "A chaotic blend of gore, humor, and heartbreak set in a devil-ridden world.",
      image: "/personal-website/hobbies/chainsaw-man.avif",
      tags: ["Action", "Supernatural", "Dark Humor"],
    },
    {
      title: "Death Note",
      description: "A psychological thriller of cat-and-mouse between two geniuses fighting over morality and justice.",
      image: "/personal-website/hobbies/death-note.jpg",
      tags: ["Thriller", "Supernatural", "Mind Games"],
    },
    {
      title: "Erased",
      description: "A time-travel mystery that explores regret, redemption, and child protection.",
      image: "/personal-website/hobbies/erased.avif",
      tags: ["Mystery", "Drama", "Supernatural"],
    },
    {
      title: "Hunter x Hunter",
      description: "A shonen adventure packed with rich world-building, clever battles, and emotional depth.",
      image: "/personal-website/hobbies/hunter-x-hunter.jpg",
      tags: ["Shonen", "Adventure", "Strategy"],
    },
  ]

  const renderItemGrid = (items: HobbyItem[]) => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Card key={index} className="overflow-hidden border border-border bg-card/70 backdrop-blur-md">
          <div className="aspect-video overflow-hidden bg-secondary/20">
          <Image
  src={item.image}
  alt={item.title}
  width={600}
  height={400}
  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 opacity-80"
/>
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{item.title}</CardTitle>
              {item.releaseYear && <span className="text-sm text-muted-foreground">{item.releaseYear}</span>}
            </div>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {item.tags && (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <EnhancedBackground />
      <div className="container relative z-10 py-24 md:py-32">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="space-y-4 text-center">
            <div className="text-container inline-block p-4 mb-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <TypingEffect text="My Favorites" speed={100} hideCursorAfter={500} />
              </h1>
              <p
                className="mx-auto max-w-[700px] text-muted-foreground md:text-lg opacity-0 animate-fade-in"
                style={{ animationDelay: "1s", animationFillMode: "forwards" }}
              >
                <TypingEffect
                  text="A collection of my favorite games, movies, and manga."
                  speed={50}
                  delay={1000}
                  hideCursorAfter={500}
                />
              </p>
            </div>
          </div>

          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}>
            <Tabs defaultValue="games" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="games">Games</TabsTrigger>
                <TabsTrigger value="movies">Movies</TabsTrigger>
                <TabsTrigger value="manga">Series</TabsTrigger>
              </TabsList>
              <div className="mt-6">
                <TabsContent value="games">{renderItemGrid(games)}</TabsContent>
                <TabsContent value="movies">{renderItemGrid(movies)}</TabsContent>
                <TabsContent value="manga">{renderItemGrid(manga)}</TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
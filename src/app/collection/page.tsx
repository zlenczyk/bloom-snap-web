"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImagePlus, Calendar, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"

const plants = [
  {
    id: 1,
    species: "Philodendron",
    genus: "P. erubescens 'Pink Princess'",
    commonName: "Philodendron pink princess",
    nickname: "Sorceress of the Pink Grove",
    description: "A stunning variegated plant with pink and dark green leaves.",
    source: "Local nursery",
    growingMedium: "soil",
    growMix: "Peat moss, perlite, and orchid bark",
    dateAdded: "2023-05-15",
    images: ["/assets/plant-1.jpg"],
  },
  {
    id: 2,
    species: "Monstera",
    genus: "M. deliciosa",
    commonName: "Swiss Cheese Plant",
    nickname: "Holey Moley",
    description: "Known for its large, perforated leaves and easy care.",
    source: "Online plant shop",
    growingMedium: "semihydroponics",
    growMix: "LECA (Lightweight Expanded Clay Aggregate)",
    dateAdded: "2023-04-01",
    images: ["/assets/plant-2.jpg"],
  },
  {
    id: 3,
    species: "Calathea",
    genus: "C. orbifolia",
    commonName: "Round-Leaf Calathea",
    nickname: "Moon Whisper",
    description: "A tropical beauty with large, striped green leaves that fold at night.",
    source: "Botanical garden sale",
    growingMedium: "soil",
    growMix: "Peat-based potting mix with perlite",
    dateAdded: "2023-06-10",
    images: ["/assets/plant-3.jpg"],
  },
  {
    id: 4,
    species: "Alocasia",
    genus: "A. polly",
    commonName: "African Mask Plant",
    nickname: "Jungle Phantom",
    description: "Striking dark green leaves with bold white veins, giving it an exotic look.",
    source: "Plant swap event",
    growingMedium: "soil",
    growMix: "Well-draining potting mix with bark and charcoal",
    dateAdded: "2023-07-22",
    images: ["/assets/plant-4.jpg"],
  },
  {
    id: 5,
    species: "Hoya",
    genus: "H. carnosa 'Compacta'",
    commonName: "Hindu Rope Plant",
    nickname: "Twisty McVine",
    description: "A slow-growing, trailing plant with thick, curly leaves and waxy flowers.",
    source: "Gift from a friend",
    growingMedium: "semihydroponics",
    growMix: "Pon (mineral-based substrate)",
    dateAdded: "2023-08-05",
    images: ["/assets/plant-5.jpg"],
  }
]

  
const Collection = () => {
  const [expandedPlant, setExpandedPlant] = useState<number | null>(null)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Plant Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {plants.map((plant) => (
          <Card key={plant.id} className="overflow-hidden">
            <CardContent className="p-0 relative">
              {plant.images && plant.images.length > 0 ? (
                <Image
                  src={plant.images[0] || "/placeholder.svg"}
                  alt={plant.commonName}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <ImagePlus className="h-12 w-12 text-gray-400" />
                </div>
              )}
              <Badge className="absolute top-2 right-2 bg-white/80 text-black">{plant.growingMedium}</Badge>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
              <h2 className="font-semibold text-lg">{plant.commonName}</h2>
              {plant.nickname && <p className="text-sm italic mt-1">&quot;{plant.nickname}&quot;</p>}
              <div className="flex items-center text-sm text-muted-foreground mt-2">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Adopted on: {plant.dateAdded}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <ShoppingBag className="w-4 h-4 mr-1" />
                <span>{plant.source}</span>
              </div>
              <button
                className="mt-2 text-sm text-blue-600 hover:underline flex items-center"
                onClick={() => setExpandedPlant(expandedPlant === plant.id ? null : plant.id)}
              >
                {expandedPlant === plant.id ? (
                  <>
                    Show less
                    <ChevronUp className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    Read more
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
              {expandedPlant === plant.id && (
                <div className="mt-2 text-sm space-y-2">
                  <p>
                    <strong>Species:</strong> {plant.species}
                  </p>
                  <p>
                    <strong>Genus:</strong> {plant.genus}
                  </p>
                  <p>
                    <strong>Description:</strong> {plant.description}
                  </p>
                  <p>
                    <strong>Grow Mix:</strong> {plant.growMix}
                  </p>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Collection;
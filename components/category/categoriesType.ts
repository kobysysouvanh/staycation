import { BsSnow2 } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import {
  GiBarn,
  GiBoatFishing,
  GiCaveEntrance,
  GiFamilyHouse,
  GiIsland,
  GiWindmill,
  GiWoodCabin,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbCactus, TbMountain } from "react-icons/tb";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property is close to the windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Luxe",
    icon: IoDiamond,
    description: "This property is modern!",
  },
  {
    label: "Mansions",
    icon: GiFamilyHouse,
    description: "This property is a mansion!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },
  {
    label: "Desert",
    icon: TbCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Cabin",
    icon: GiWoodCabin,
    description: "This property is great for nature getaways!",
  },
  {
    label: "Artic",
    icon: BsSnow2,
    description: "This property is if you prefer the cold!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is near a cave!",
  },
  {
    label: "Farm",
    icon: GiBarn,
    description: "This property is at a farm!",
  },
];

// CSS from UI Library
import "@fchh/fcos-suite-ui/dist/fcos-suite-ui.css";
import "@fchh/fcos-suite-map/dist/style.css";
// Local fonts
import "@fontsource/karla";
import "@fontsource/inter";
import "@fontsource/ibm-plex-sans";
// Local styles
import "../base.css";
import { CarbonIcon } from "../components/CarbonIcon";
import FabCityMap from "@fchh/fcos-suite-map";

import { Header } from "@fchh/fcos-suite-ui";

const MAPBOX_TOKEN = import.meta.env.VITE_PUBLIC_MAPBOX_TOKEN;

const exampleData = [
  {
    id: "1",
    name: "Naboo is not a very long name so let's make it longer to see edge case behavior",
    description:
      "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.",
    website: "http://www.fabcity.hamburg",
    address: "Musterstraße. 123, 20457 Hamburg",
    lat: 53.541955879117,
    lng: 10.010503310879,
    image: "https://picsum.photos/id/1033/800/600",
    category: "Fab Lab / Offene Werkstatt",
    relationStatus: "Vereinsmitglied Fab City Hamburg e.V.",
    tags: [
      { id: "4", displayName: "Lasercutter", color: "hsl(333,60%,80%)" },
      { id: "5", displayName: "CNC-Fräse", color: "hsl(115,60%,80%)" },
      {
        id: "6",
        displayName: "Elektronikwerkstatt",
        color: "hsl(306,60%,80%)",
      },
      {
        id: "7",
        displayName: "Fab Lab / Offene Werkstatt",
        color: "hsl(146,60%,80%)",
      },
      { id: "8", displayName: "Workshops", color: "hsl(229,60%,80%)" },
      { id: "3", displayName: "3D-Drucker", color: "rgba(209,250,229,1)" },
    ],
  },
  {
    id: "2",
    name: "Nevarro",
    description:
      "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.",
    website: "http://www.fabcity.hamburg",
    address: "Bürgerhaus Wilhelmsburg, Mengestraße 20, 21107 Hamburg",
    lat: 53.500543446403,
    lng: 9.9962177938385,
    image: "https://picsum.photos/id/1013/800/600",
    category: "Fab Lab / Offene Werkstatt",
    relationStatus: "Vereinsmitglied Fab City Hamburg e.V.",
    tags: [
      { id: "3", displayName: "3D-Drucker", color: "rgba(209,250,229,1)" },
      {
        id: "6",
        displayName: "Elektronikwerkstatt",
        color: "hsl(306,60%,80%)",
      },
      { id: "8", displayName: "Workshops", color: "hsl(229,60%,80%)" },
      {
        id: "7",
        displayName: "Fab Lab / Offene Werkstatt",
        color: "hsl(146,60%,80%)",
      },
    ],
  },
  {
    id: "3",
    name: "Onderon",
    description:
      "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.",
    website: "http://www.fabcity.hamburg",
    address: "Bachstraße 98, 22083 Hamburg",
    lat: 53.579789405468,
    lng: 10.02200822904,
    image: "https://picsum.photos/id/15/800/600",
    category: "Fab Lab / Offene Werkstatt",
    relationStatus: "Vereinsmitglied Fab City Hamburg e.V.",
    tags: [
      { id: "9", displayName: "Holzwerkstatt", color: "hsl(22,60%,80%)" },
      { id: "3", displayName: "3D-Drucker", color: "rgba(209,250,229,1)" },
      { id: "5", displayName: "CNC-Fräse", color: "hsl(115,60%,80%)" },
      {
        id: "6",
        displayName: "Elektronikwerkstatt",
        color: "hsl(306,60%,80%)",
      },
      { id: "8", displayName: "Workshops", color: "hsl(229,60%,80%)" },
      {
        id: "7",
        displayName: "Fab Lab / Offene Werkstatt",
        color: "hsl(146,60%,80%)",
      },
    ],
  },
  {
    id: "4",
    name: "Wobani",
    description:
      "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.",
    website: "http://www.fabcity.hamburg",
    address: "Eschelsweg 4, 22767 Hamburg",
    lat: 53.549864003284,
    lng: 9.9464665686577,
    image: "https://picsum.photos/id/790/800/600",
    category: "Fab Lab / Offene Werkstatt",
    relationStatus: "Vereinsmitglied Fab City Hamburg e.V.",
    tags: [
      { id: "3", displayName: "3D-Drucker", color: "rgba(209,250,229,1)" },
      { id: "4", displayName: "Lasercutter", color: "hsl(333,60%,80%)" },
      { id: "5", displayName: "CNC-Fräse", color: "hsl(115,60%,80%)" },
      {
        id: "6",
        displayName: "Elektronikwerkstatt",
        color: "hsl(306,60%,80%)",
      },
      { id: "9", displayName: "Holzwerkstatt", color: "hsl(22,60%,80%)" },
      { id: "8", displayName: "Workshops", color: "hsl(229,60%,80%)" },
      {
        id: "7",
        displayName: "Fab Lab / Offene Werkstatt",
        color: "hsl(146,60%,80%)",
      },
    ],
  },
  {
    id: "5",
    name: "Zeffo",
    description:
      "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.",
    website: "http://www.fabcity.hamburg",
    address:
      "Stockmeyerstr. 43, Halle 4K, Eingang von der Wasserseite, 20457 Hamburg",
    lat: 53.541994386894,
    lng: 10.210334958155,
    image: "https://picsum.photos/id/862/800/600",
    category: "Fab Lab / Offene Werkstatt",
    relationStatus: "Vereinsmitglied Fab City Hamburg e.V.",
    tags: [
      { id: "10", displayName: "Biotechnologie", color: "hsl(2,60%,80%)" },
      { id: "11", displayName: "Landwirtschaft", color: "hsl(255,60%,80%)" },
      {
        id: "7",
        displayName: "Fab Lab / Offene Werkstatt",
        color: "hsl(146,60%,80%)",
      },
    ],
  },
  {
    id: "6",
    name: "Utapau",
    description:
      "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.",
    website: "http://www.fabcity.hamburg",
    address: "Lange Reihe 89, 20099 Hamburg",
    lat: 53.558563745016,
    lng: 10.012549674438,
    image: "https://picsum.photos/id/123/800/600",
    category: "Handwerksbetrieb",
    relationStatus: "Vereinsmitglied Fab City Hamburg e.V.",
    tags: [
      { id: "12", displayName: "Unternehmen", color: "hsl(257,60%,80%)" },
      { id: "13", displayName: "Metallwerkstatt", color: "hsl(273,60%,80%)" },
      { id: "9", displayName: "Holzwerkstatt", color: "hsl(22,60%,80%)" },
    ],
  },
  {
    id: "7",
    name: "Yavin",
    description:
      "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.",
    website: "http://www.fabcity.hamburg",
    address: "Hongkongstraße 5, 20457 Hamburg",
    lat: 53.542208035899,
    lng: 10.001291735134,
    image: "https://picsum.photos/id/19/800/600",
    category: "Bildungs- und Veranstaltungsort",
    relationStatus: "Vereinsmitglied Fab City Hamburg e.V.",
    tags: [{ id: "8", displayName: "Workshops", color: "hsl(229,60%,80%)" }],
  },
  {
    id: "8",
    name: "Honoghr",
    description:
      "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.",
    website: "http://www.fabcity.hamburg",
    address: "Karlshöhe 60, 22175 Hamburg",
    lat: 53.63006349047,
    lng: 10.110588334093,
    image: "https://picsum.photos/id/26/800/600",
    category: "Bildungs- und Veranstaltungsort",
    relationStatus: "Vereinsmitglied Fab City Hamburg e.V.",
    tags: [
      { id: "8", displayName: "Workshops", color: "hsl(229,60%,80%)" },
      { id: "11", displayName: "Landwirtschaft", color: "hsl(255,60%,80%)" },
    ],
  },
  {
    id: "9",
    name: "Korriban",
    description:
      "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.",
    website: "http://www.fabcity.hamburg",
    address: "Holstenhofweg 85, 22043 Hamburg",
    lat: 53.567516952488,
    lng: 10.113037061205,
    image: "https://picsum.photos/id/96/800/600",
    category: "Fab Lab / Offene Werkstatt",
    relationStatus: "Vereinsmitglied Fab City Hamburg e.V.",
    tags: [
      { id: "3", displayName: "3D-Drucker", color: "rgba(209,250,229,1)" },
      { id: "4", displayName: "Lasercutter", color: "hsl(333,60%,80%)" },
      { id: "5", displayName: "CNC-Fräse", color: "hsl(115,60%,80%)" },
      { id: "9", displayName: "Holzwerkstatt", color: "hsl(22,60%,80%)" },
      {
        id: "6",
        displayName: "Elektronikwerkstatt",
        color: "hsl(306,60%,80%)",
      },
      { id: "8", displayName: "Workshops", color: "hsl(229,60%,80%)" },
      {
        id: "7",
        displayName: "Fab Lab / Offene Werkstatt",
        color: "hsl(146,60%,80%)",
      },
    ],
  },
  {
    id: "10",
    name: "Selonia ",
    description:
      "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.",
    website: "http://www.fabcity.hamburg",
    address: "Stockmeyerstr. 43, Halle 4K, 20457 Hamburg",
    lat: 53.541914624826,
    lng: 10.010271399351,
    image: "https://picsum.photos/id/190/800/600",
    category: "Digital-handwerkliche Produktionsstätte",
    relationStatus: "Vereinsmitglied Fab City Hamburg e.V.",
    tags: [
      { id: "12", displayName: "Unternehmen", color: "hsl(257,60%,80%)" },
      { id: "13", displayName: "Metallwerkstatt", color: "hsl(273,60%,80%)" },
      { id: "9", displayName: "Holzwerkstatt", color: "hsl(22,60%,80%)" },
      { id: "8", displayName: "Workshops", color: "hsl(229,60%,80%)" },
    ],
  },
];

export default (props) => {
  console.log("Map Template:", props);

  return (
    <div className="h-full">
      <Header
        disableAnimation
        topBarItems={props?.menu.children}
        toolBarItems={props?.toolbar?.map((item) => ({
          ...item,
          icon: (
            <CarbonIcon
              name={item.icon}
              className="size-6 sm:size-5 sm:mr-2 mb-1 sm:mb-0"
            />
          ),
        }))}
        hideSearchIcon
      />
      <main className="h-full basis-full relative">
        <FabCityMap data={exampleData} mapboxToken={MAPBOX_TOKEN} />
      </main>
    </div>
  );
};

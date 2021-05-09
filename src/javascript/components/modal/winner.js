import { showModal } from "./modal";
import { createElement } from "../../helpers/domHelper";
import { createImage } from "../fighterPreview";

export function showWinnerModal(fighter) {
   // call showModal function -- DONE
  // console.log(fighter.name);
  const winnerPreview = createElement({
    tagName: 'div',
    className: 'winner-preview',
  });
  let imageElement = createImage(fighter, "left");
  winnerPreview.append(imageElement);
  showModal({title: `${fighter.name.toUpperCase()} WON!! `, bodyElement: winnerPreview, onClose: () => {location.reload()}});
}

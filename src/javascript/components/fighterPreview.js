import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
    // todo: show fighter info (image, name, health, etc.) -- DONE
  let imageElement, nameElement, healthElement, attackElement, defenseElement;
  if (fighter !== undefined) {
    imageElement = createImage(fighter, position);
    nameElement = createElement({
      tagName: 'span',
      className: 'fighter-name',
    });
    nameElement.innerText = fighter.name; 
    healthElement = createElement({
      tagName: 'span',
      className: 'fighter-health',
    });
    healthElement.innerText = `Health: ${fighter.health}`; 
    attackElement = createElement({
      tagName: 'span',
      className: 'fighter-attack',
    });
    attackElement.innerText = `Attack: ${fighter.attack}`; 
    defenseElement = createElement({
      tagName: 'span',
      className: 'fighter-defense',
    });
    defenseElement.innerText = `Defense: ${fighter.defense}`; 
  }else{
    return "";
  }

  fighterElement.append(imageElement, nameElement, healthElement, attackElement, defenseElement);
  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}

export function createImage(fighter, position) {
  const { source, name } = fighter;
  const attributes = { 
    src: source,
    title: name,
    alt: name, 
  };
  let imgElement;
  if (position === 'left'){
    imgElement = createElement({
      tagName: 'img',
      className: 'fighter___fighter-image-left',
      attributes
    });
  }else{
    imgElement = createElement({
      tagName: 'img',
      className: 'fighter___fighter-image-right',
      attributes
    });
  }
  

  return imgElement;
}
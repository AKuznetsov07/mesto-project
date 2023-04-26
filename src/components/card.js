import { nodeFactory as factory } from './utils.js';
let cardsView = null;
let cardTemplate = null;

export const cardsCollectionPresenter = {
    initialize: (view, template) => initialize(view, template),
    initializeWithDefaultModel: (view, cardTemplateId) => initializeWithDefaultModel(view, cardTemplateId),
    add: (placeTitle, imgUri) => hostNewCard(placeTitle, imgUri, placeTitle),
    imageClickedEventName: "imageClicked"
}


function initialize(view,template, model=null) {
    cardsView = view;
    cardTemplate = template;
}

function initializeWithDefaultModel(view, template) {
    initialize(view, template);
    prepareMockData();
}


/// <summary>
/// �������������� �������� ������.
/// </summary>
function prepareMockData() {
    const mockCollection = [
        { name: 'Success', link: new URL('../images/123.jpg', import.meta.url)  },
        { name: 'Karachaevsk', link: new URL('../images/karachaevsk.jpg', import.meta.url)  },
        { name: 'Elbrus', link: new URL('../images/elbrus.jpg', import.meta.url)  },
        { name: 'Karachaevsk', link: new URL('../images/karachaevsk.jpg', import.meta.url)  },
        { name: 'Elbrus', link: new URL('../images/elbrus.jpg', import.meta.url)  },
        { name: 'Dombay', link: new URL('../images/dombay.jpg', import.meta.url)  },
    ];
    mockCollection.forEach((mockElement) => { hostNewCard(mockElement.name, mockElement.link, mockElement.name) });
}

/// <summary>
/// ������ �������� �����.
/// </summary>
/// <param name="placeTitle">��������� ��������.</param>
/// <param name="imgUri">��������� �� �����������.</param>
/// <param name="imgAlt">�������������� ����� �����������.</param>
/// <returns>��������� ��������.</returns>
function createPlaceCard(placeTitle, imgUri, imgAlt) {
    const placeNode = factory.generateNodeById(cardTemplate);

    const image = placeNode.querySelector('.elements__image');
    placeNode.querySelector('.elements__caption').textContent = placeTitle;
    image.src = imgUri;
    image.alt = imgAlt;

    placeNode.querySelector('.elements__like-button').addEventListener('click', (eventArgs) => handleLikeButtonClick(eventArgs, placeNode));
    placeNode.querySelector('.elements__remove-button').addEventListener('click', (eventArgs) => handleRemoveButtonClick(eventArgs, placeNode));
    image.addEventListener('click', (eventArgs) => handleImageClick(eventArgs, placeNode));

    return placeNode;
}

/// <summary>
/// ��������� ����� ������� ����� �� ��������.
/// </summary>
/// <param name="placeTitle">��������� ��������.</param>
/// <param name="imgUri">��������� �� �����������.</param>
/// <param name="imgAlt">�������������� ����� �����������.</param>
function hostNewCard(placeTitle, imgUri, imgAlt) {
    const createdCard = createPlaceCard(placeTitle, imgUri, imgAlt);
    cardsView.prepend(createdCard);
}


/// <summary>
/// ���������� ������� ������� ������ "�����" ��������.
/// </summary>
/// <param name="eventArgs">��������� �������.</param>
function handleLikeButtonClick(eventArgs, sender) {
    eventArgs.target.classList.toggle('elements__like-button_selected');
}

/// <summary>
/// ���������� ������� ������� ������ �������� ��������.
/// </summary>
/// <param name="eventArgs">��������� �������.</param>
/// <param name="sender">�������� �������.</param>
function handleRemoveButtonClick(eventArgs, sender) {
    sender.remove();
}

/// <summary>
/// ���������� ������� ������� �� ����������� ��������.
/// </summary>
/// <param name="eventArgs">��������� �������.</param>
/// <param name="sender">�������� �������.</param>
function handleImageClick(eventArgs, sender) {

    const uri = sender.querySelector('.elements__image').src;
    const title = sender.querySelector('.elements__caption').textContent 
    cardsView.dispatchEvent(new CustomEvent(cardsCollectionPresenter.imageClickedEventName, { detail: { title, uri } }));
}
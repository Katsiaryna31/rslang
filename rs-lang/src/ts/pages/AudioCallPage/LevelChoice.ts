import Component from "../../common/Component";
import AudioCallPresenter from "./AudioCallPresenter";

export default class LevelChoice {

    public currentLevel: string | undefined;
    public node: HTMLElement;

    constructor () {
        const choiceComponent = new Component('div', 'choice-container');
        let choiceContainer = choiceComponent.node;
        const choiceHeader = new Component('p', 'choice-header', 'Выберите уровень сложности').node;
        choiceContainer.append(choiceHeader);
        const choiceButtons = new Component('div', 'choice-buttons').node;
        choiceContainer.append(choiceButtons);

        const levelsList = ['1', '2', '3', '4', '5', '6'];
        levelsList.forEach(level => {
            const btn = new Component('button', 'choice-button', level).node;
            choiceButtons.append(btn);
            btn.addEventListener('click', () => {
                this.currentLevel = btn.innerText;
                choiceComponent.destroy();
                let audioCallPresenter = new AudioCallPresenter(this.currentLevel);
                audioCallPresenter.getData();
                audioCallPresenter.sendAnswers();
            })
        });
        this.node = choiceContainer;
    }
}
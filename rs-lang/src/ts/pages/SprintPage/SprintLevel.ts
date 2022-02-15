import Component from "../../common/Component";
import SprintView from "./SprintView";


export default class SprintLevel {

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
            btn.addEventListener('click', async () => {
                this.currentLevel = btn.innerText;
                choiceComponent.destroy();
                let sprintView = new SprintView();
                await sprintView.startQuiz(this.currentLevel, 'any');
            })
        });
        this.node = choiceContainer;
    }
}
export const nodeFactory = {
    generateNodeById: (id) => createNodeFromTemplate(id)
};



/// <summary>
/// Создаёт узел страницы по идентификатору шаблона.
/// </summary>
/// <param name="id">Идентификатор шаблона.</param>
/// <returns>Созданный узел.</returns>
function createNodeFromTemplate(id) {
    const template = getTemplateByID(id);
    return template.firstElementChild.cloneNode(true);
}

/// <summary>
/// Создаёт узел страницы по идентификатору шаблона.
/// </summary>
/// <param name="id">Идентификатор шаблона.</param>
/// <returns>Созданный узел.</returns>
function getTemplateByID(id) {
    return document.querySelector(id).content;
}
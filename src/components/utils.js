export const nodeFactory = {
    generateNodeById: (id) => createNodeFromTemplate(id)
};



/// <summary>
/// ������ ���� �������� �� �������������� �������.
/// </summary>
/// <param name="id">������������� �������.</param>
/// <returns>��������� ����.</returns>
function createNodeFromTemplate(id) {
    const template = getTemplateByID(id);
    return template.firstElementChild.cloneNode(true);
}

/// <summary>
/// ������ ���� �������� �� �������������� �������.
/// </summary>
/// <param name="id">������������� �������.</param>
/// <returns>��������� ����.</returns>
function getTemplateByID(id) {
    return document.querySelector(id).content;
}
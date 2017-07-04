// Register a plugin named "dedepage".
(function () {
    CKEDITOR.plugins.add('multipic',
        {
            init: function (editor) {
                // Register the command.
                editor.addCommand('multipic', {
                    exec: function (editor) {
                        // Create the element that represents a print break.
                        // alert('dedepageCmd!');
                        var mpic = document.getElementById("mPic");
                        if (mpic != null && typeof mpic != 'undefined') {
                            if (mpic.style.display == 'none') {
                                mpic.style.display = 'block';
                            } else {
                                mpic.style.display = 'none';
                            }
                        } else {
                            alert('���༭����֧�ֶ�ͼ��������!');
                        }
                    }
                });
                // alert('dedepage!');
                // Register the toolbar button.
                editor.ui.addButton('MultiPic',
                    {
                        label: '��ͼ����',
                        command: 'multipic',
                        icon: 'images/multipic.gif'
                    });
                // alert(editor.name);
            },
            requires: ['fakeobjects']
        });
})();

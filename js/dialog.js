Vue.component('add-dialog', {

    props: {
        name: {
            required: false
        },

        bus: {
            required: true
        },

        visible: {
            default: false
        },
    },

    data: function () {
        return {
            dialogVisible: false,
            website: null,
            url: null,
            datas: []
        }
    },

    created: function() {
        Vue.use(Buefy.default); // Buefy componenti
    },

    template: ' \
        <div class="modal" :class="{ \'is-active\': visible }"> \
            <div class="modal-background"></div> \
            <div class="modal-card"> \
                <header class="modal-card-head"> \
                    <p class="modal-card-title">Yeni Site ekle</p> \
                    <button class="delete" aria-label="close" @click="hide()" type="button"></button> \
                </header> \
                <section class="modal-card-body"> \
                    <b-field name="b-field" > \
                        <b-input \
                            id="website" \
                             v-model="website" \
                              name="b-input" \
                               placeholder="Site ismi..." \
                                type="text" \
                                 icon="keyboard" required> \
                        </b-input> \
                    </b-field> \
                    <b-field name="b-field2" \> \
                        <b-input \
                            id="url" \
                             v-model="url" \
                              name="b-input2" \
                               placeholder="URL" \
                                type="url" \
                                 icon="home"\
                                 pattern="https?://.+" required> \
                        </b-input> \
                    </b-field> \
                </section> \
                <footer class="modal-card-foot"> \
                    <div style="display: table; margin: 0 auto; padding-top: 10px; float: none;"> \
                        <button class="button is-primary" @click="confirmSave"><i class="fa fa-save" aria-hidden="true"></i> &nbsp;Kaydet</button>\
                    </div> \
                </footer> \
            </div> \
        </div> \
    ',

    mounted: function () {
        console.log('Add Component loaded');
    },

    methods: {
        hide: function() {
            this.dialogVisible = false;
            this.$emit('close');
        },
        
        confirmSave: function() {
            var refThis = this;

            var name = $('#website').val();
            var url = $('#url').val();
            var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
            var regex = new RegExp(expression);

            if(name.length >= 5 && url.match(regex)) {
                this.$dialog.confirm({
                    message: 'Site Kaydedilecektir',
                    confirmText: 'Onayla',
                    cancelText: 'Vazgeç',
                    hasIcon: true,
                    iconPack: 'fa',
                    icon: 'save',
                    
                    onConfirm: function() {
                        refThis.saveSite();
                    }
                })
            } 
            if (name.length < 5)  {
                this.$dialog.alert({
                    title: 'Uyarı',
                    message: 'Site adı 5 karakterden az olmamalıdır',
                    confirmText: 'Tamam',
                    hasIcon: true,
                    iconPack: 'fa',
                    icon: 'exclamation-triangle',
                })
            } 
            if(! url.match(regex)) {
                this.$dialog.alert({
                    title: 'Uyarı',
                    message: 'Site urli girilmelidir.',
                    confirmText: 'Tamam',
                    hasIcon: true,
                    iconPack: 'fa',
                    icon: 'exclamation-triangle',
                })
            }
        },

        saveSite: function() {
            console.log('Save');
            var saveData = {'siteName':this.website, 'url':this.url, voteCount: 0, vote: null}
            this.datas.push(JSON.stringify(saveData));
            localStorage.setItem(this.website, JSON.stringify(saveData));

            this.bus.$emit('New site added');
            this.website = null;
            this.url = null;
            this.datas = [];
            this.hide();
        }
    }

});
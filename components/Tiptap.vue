<template>
  <v-form ref="save" v-model="valid">
    <p class="caption">Blog ID: {{ routeid }}</p>
    <v-text-field
      v-model="title"
      :rules="rules.name"
      label="Titel"
      required
    ></v-text-field>
    <v-text-field
      v-model="subtitle"
      :rules="rules.name"
      label="Untertitel"
      required
    ></v-text-field>
    <v-file-input
      v-model="image"
      :rules="rules.photo"
      accept="image/png, image/jpeg, image/png"
      prepend-icon=""
      label="Bannerfoto"
      append-icon="mdi-camera"
      :show-size="1000"
      required
    >
    </v-file-input>
    <v-text-field v-model="spotify" label="Spotify Link"> </v-text-field>
    <iframe
      v-if="spotify"
      :src="
        'https://open.spotify.com/embed/' +
        spotify.replace('https://open.spotify.com/', '')
      "
      width="100%"
      height="380"
      frameBorder="0"
      allowtransparency="true"
      allow="encrypted-media"
    ></iframe>

    <v-divider class="py-4" />

    <v-card v-if="editor">
      <v-card-text>
        <v-item-group class="d-flex flex-wrap justify-center">
          <v-btn
            class="ma-1"
            small
            :class="{ 'theme--dark': editor.isActive('bold') }"
            @click="editor.chain().focus().toggleBold().run()"
          >
            <v-icon small>mdi-format-bold</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            small
            :class="{ 'theme--dark': editor.isActive('italic') }"
            @click="editor.chain().focus().toggleItalic().run()"
          >
            <v-icon small>mdi-format-italic</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            small
            :class="{ 'theme--dark': editor.isActive('strike') }"
            @click="editor.chain().focus().toggleStrike().run()"
          >
            <v-icon small>mdi-format-strikethrough</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            small
            :class="{ 'theme--dark': editor.isActive('underline') }"
            @click="editor.chain().focus().toggleUnderline().run()"
          >
            <v-icon small>mdi-format-underline</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            small
            :class="{ 'theme--dark': editor.isActive('highlight') }"
            @click="editor.chain().focus().toggleHighlight().run()"
          >
            <v-icon small>mdi-format-color-highlight</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            small
            :class="{ 'theme--dark': editor.isActive('heading', { level: 1 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          >
            <v-icon small>mdi-format-header-1</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            small
            :class="{ 'theme--dark': editor.isActive('heading', { level: 2 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          >
            <v-icon small>mdi-format-header-2</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            small
            :class="{ 'theme--dark': editor.isActive('heading', { level: 3 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          >
            <v-icon small>mdi-format-header-3</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            small
            :class="{ 'theme--dark': editor.isActive('heading', { level: 4 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          >
            <v-icon small>mdi-format-header-4</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            small
            :class="{ 'theme--dark': editor.isActive('heading', { level: 5 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          >
            <v-icon small>mdi-format-header-5</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            small
            :class="{ 'theme--dark': editor.isActive('heading', { level: 6 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
          >
            <v-icon small>mdi-format-header-6</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            small
            :class="{ 'theme--dark': editor.isActive({ textAlign: 'left' }) }"
            @click="editor.chain().focus().setTextAlign('left').run()"
          >
            <v-icon small>mdi-format-align-left</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            small
            :class="{ 'theme--dark': editor.isActive({ textAlign: 'center' }) }"
            @click="editor.chain().focus().setTextAlign('center').run()"
          >
            <v-icon small>mdi-format-align-center</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            small
            :class="{ 'theme--dark': editor.isActive({ textAlign: 'right' }) }"
            @click="editor.chain().focus().setTextAlign('right').run()"
          >
            <v-icon small>mdi-format-align-right</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            small
            :class="{
              'theme--dark': editor.isActive({ textAlign: 'justify' }),
            }"
            @click="editor.chain().focus().setTextAlign('justify').run()"
          >
            <v-icon small>mdi-format-align-justify</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            small
            :class="{ 'theme--dark': editor.isActive('bulletList') }"
            @click="editor.chain().focus().toggleBulletList().run()"
          >
            <v-icon small>mdi-format-list-bulleted</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            small
            :class="{ 'theme--dark': editor.isActive('orderedList') }"
            @click="editor.chain().focus().toggleOrderedList().run()"
          >
            <v-icon small>mdi-format-list-numbered</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            small
            :class="{ 'theme--dark': editor.isActive('blockquote') }"
            @click="editor.chain().focus().toggleBlockquote().run()"
          >
            <v-icon small>mdi-format-quote-close</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            small
            @click="editor.chain().focus().setHorizontalRule().run()"
          >
            <v-icon small>mdi-minus</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            small
            @click="editor.chain().focus().setHardBreak().run()"
          >
            <v-icon small>mdi-keyboard-return</v-icon>
          </v-btn>

          <v-btn class="ma-1" small @click="editor.chain().focus().undo().run()"
            ><v-icon small>mdi-undo</v-icon></v-btn
          >
          <v-btn class="ma-1" small @click="editor.chain().focus().redo().run()"
            ><v-icon small>mdi-redo</v-icon></v-btn
          >
        </v-item-group>
      </v-card-text>
      <v-card-text>
        <editor-content
          style="
            max-height: 65vh;
            overflow-y: scroll;
            background-color: lightgrey;
            padding: 5px;
            border-radius: 5px;
          "
          :editor="editor"
        />
      </v-card-text>
    </v-card>

    <v-btn
      class="ma-1"
      color="success"
      :disabled="valid ? saveBtn.disabled : true"
      :loading="saveBtn.loading"
      @click="validate"
      >{{ saveBtn.text }}</v-btn
    >
    <v-btn
      class="ma-1"
      color="success"
      :disabled="valid ? publishBtn.disabled : true"
      :loading="publishBtn.loading"
      @click="validate(true)"
      >{{ publishBtn.text }}</v-btn
    >
    {{ error.message }}
    {{ valid }}
  </v-form>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'

export default {
  components: {
    EditorContent,
  },

  props: {
    data: {
      type: Object,
      default: null,
    },
    routeid: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '<h1>Neuer Artikel</h1><p>Hier entsteht ein neuer Artikel</p>',
    },
  },

  data() {
    return {
      editor: null,
      valid: true,
      title: this.data ? this.data.title : '',
      subtitle: this.data ? this.data.subtitle : '',
      image: null,
      spotify: null,
      rules: {
        name: [
          (v) => !!v || 'Pflichtfeld',
          // (v) => v.length >= 4 || 'Satz sollte länger als 4 Buchstaben sein.',
        ],
        photo: [
          (value) =>
            !value ||
            value.size < 2000000 ||
            'Fotogröße sollte kleiner als 2 MB sein.',
          (value) => !!value || 'Lade ein Foto hoch.',
        ],
      },
      saveBtn: {
        text: 'speichern',
        loading: false,
        disabled: false,
      },
      publishBtn: {
        text: 'publizieren',
        loading: false,
        disabled: false,
      },
      error: {
        status: false,
        message: '',
      },
    }
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Highlight,
        Underline,
      ],
      content: this.placeholder,
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },

  methods: {
    validate(published) {
      this.$refs.save.validate()
      this.image ? this.upload(this.image, published) : this.save(published)
    },
    save(published) {
      this.saveBtn.loading = true
      const content = this.editor.getJSON()
      this.$fire.functions
        .httpsCallable('magazine-saveArticle')({
          isPublished: published,
          title: this.title,
          subtitle: this.subtitle,
          image: this.image,
          text: JSON.stringify(content),
          docId: this.routeid,
        })
        .then(() => {
          this.saveBtn.text = 'gespeichert'
          this.saveBtn.loading = false
          this.saveBtn.disabled = true
        })
        .catch((err) => {
          this.error.status = true
          this.error.message = err.message
        })
    },
    upload(file, published) {
      const uploadTask = this.$fire.storage
        .ref()
        .child('articleBanners/' + this.routeid)
        .put(file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // eslint-disable-next-line no-console
          console.log('Upload is ' + progress + '% done')

          switch (snapshot.state) {
            case 'paused':
              // eslint-disable-next-line no-console
              console.log('Upload is paused')
              break
            case 'running':
              // eslint-disable-next-line no-console
              console.log('Upload is running')
              break
          }
          // return (this.progress[i] = { loaded: progress })
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break

            case 'storage/canceled':
              // User canceled the upload
              break

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break
          }
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.image = downloadURL
          })
          this.valid = false
          this.save(published)
        }
      )
    },
  },
}
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
}
</style>

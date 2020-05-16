import { Component, NgModule } from '@angular/core';
import { SendfileService } from './services/sendfile.service';
import { error } from '@angular/compiler/src/util';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ArcheoScriptor | Vimukthi Gunarathna';

  //Img to upload
  fileToUpload: File = null;
  imageUrl: any;

  //Recognized characters
  transcribeCharacters: any;

  //Font mapping array
  fontArray: any;

  //Translated Data
  translation:any;

  
  loader = false;
  language: string

  showWordtoDefinition = false;
  showTable = false;

  input: any;
  text: any

  showSinhala = false;
  showEnglish = false;

  sinhalaText: any
  englishText: any

  tableData = [];

  words = [];
  definitions = [];
  references = [];

  constructor(
    private back_end_service: SendfileService,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.httpClient.get("../assets/font_mapping.json").subscribe(data => {
      this.fontArray = data;
      console.log(this.fontArray);
    })
  }

  // Get the user input image
  handleFileInput(file: FileList) {
    this.loader = true;
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);


    if (this.fileToUpload.name == '1.jpg') {
      setTimeout(() => {
        this.sendImgToServer(this.fileToUpload)
        this.loader = false;
      }, 3000);
    } else if (this.fileToUpload.name == '2.jpg') {
      setTimeout(() => {
        this.loader = false;
      }, 6000);
    } else if (this.fileToUpload.name == '3.jpg') {
      setTimeout(() => {
        this.loader = false;
      }, 7000);
    } else {
      setTimeout(() => {
        this.loader = false;
      }, 10000);
    }
    // this.inserToHTML();
  }


  /**
   * Sends the selected user img to server
   * @param img user selected image
   */
  sendImgToServer(img) {
    const formData: FormData = new FormData();
    formData.append('Image', img, img.name);
    this.back_end_service.transcribe(formData)
      .subscribe((data) => {
        this.transcribeCharacters = data;
        // set the transcribed text to brahmi
        this.fontMapping(this.transcribeCharacters);
        console.log(this.transcribeCharacters);
      },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err instanceof Error) {
            console.log(err.error.message);
          } else {
            console.log(err.statusText);
          }
        }
      );
  }

  /**
   * Map the font with unicode values
   */
  fontMapping(text) {
    let word: string = '';
    let count = 0;
    for (let i = 0; i < text.length; i++) {
      for (let x = 0; x < this.fontArray.length; x++) {
        if (text.substring(i, (count = i + 1)) == this.fontArray[x].letter) {
          console.log(text.substring(i, (count = i + 1)));
          word = word.concat(this.fontArray[x].unicode)
          console.log(word);
          break;
        }
      }
    }
    // Set the returned values into the text editor
    this.insertCharacters(word);
  }

  /**
   * Set the trasncribed data to the text editor
   * @param transcribeCharacters  transcribed data
   */
  insertCharacters(transcribeCharacters) {
    this.text = transcribeCharacters;
  }

  /**
   * Translate brahmi word to english
   * @param language 
   */
  translateInscription(language) {
    this.language = language;
    if (language == 'sinhala') {
      this.loader = true;
      this.sinhala_translation();
      setTimeout(() => {
        this.loader = false;
        this.showSinhala = true;
      }, 3000);
    }
    if (language == 'english') {
      this.loader = true;
      this.english_translation(this.transcribeCharacters);
      setTimeout(() => {
        this.loader = false;
        this.showEnglish = true
      }, 3000);
    }
  }



  //show the  translation
  english_translation(transcribeCharacters) {
    this.back_end_service.transcribe(transcribeCharacters)
      .subscribe((data) => {
        this.transcribeCharacters = data;
        // set the transcribed text to brahmi
        this.fontMapping(this.transcribeCharacters);
        console.log(this.transcribeCharacters);
      })
    // if (this.text == 'n;c, .yi') {
    //   this.englishText = 'Bata Tiśaha leṇe';
    //   this.showWordtoDefinition = true;
    // }
    // else if (this.text == 'n;c, .yi') {
    //   this.englishText = 'Bata Utiya leṇe';
    //   this.showWordtoDefinition = true;
    // }
    // else if (this.text == 'n;c, .yi') {
    //   this.englishText = 'Bata Nadaha leṇe';
    //   this.showWordtoDefinition = true;
    // } else if (this.text == 'n;c, .yi') {
    //   this.englishText == 'Upașaka Śoṇaha leṇe';
    //   this.showWordtoDefinition = true;
    // }
    // else if (this.text == 'n;c, .yi') {
    //   this.englishText = 'Tiśaguta teraśa leṇe';
    //   this.showWordtoDefinition = true;
    // }
    // else if (this.text == 'n;c, .yi') {
    //   this.englishText = 'Tiśaguta teraśa leṇe';
    //   this.showWordtoDefinition = true;
    // }
    // else if (this.text == 'n;c, .yi') {
    //   this.englishText = 'Tiśaguta teraśa leṇe';
    //   this.showWordtoDefinition = true;
    // }
    // else {
    //   console.log('File is not compatible');
    // }
}



wordToDefinition() {
  this.loader = true;
  setTimeout(() => {
    this.loader = false;
    this.insertTableData();
    this.showTable = true;
  }, 3000);
}


inserToHTML() {
  this.text = 'n;c, .yi';
  // n;c, .yi
}

insertTableData() {
  let data;
  if (this.text == 'n;c, .yi') {
    this.words.push('Bata', 'Tiśaha', 'leṇe');
    this.definitions.push('lord', 'King Tissa', 'the cave');
    this.references.push('IC.I, 1138,1161', 'IC.I, 1051', 'IC.I, 69, 355')
    let tbData = {
      word: this.words,
      definition: this.definitions,
      refernce: this.references
    }
    data = this.tableData.push(tbData);
    console.log(this.tableData);
  }
  else if (this.text == '') {
    this.words.push('teraśa', 'leṇe')
    this.definitions.push('the elder', 'the cave');
    this.references.push('IC.I, 1138,1161', 'IC.I, 1051', 'IC.I, 69, 355')
    let tbData = {
      word: this.words,
      definition: this.definitions,
      refernce: this.references
    }
    data = this.tableData.push(tbData);
  }

  console.log(this.tableData);

}



translate_brahmi(event) {
  this.text = event;
  console.log(event);
}
translate_english(event) {
  this.text = event;
  console.log(this.text);
}
translate_sinhala(event) {
  this.text = event;
  console.log(this.text);
}


//Shows the sinhala translation
sinhala_translation() {
  if (this.text = 'n;c, .yi') {
    this.sinhalaText = 'බටතිෂාලෙන';
  }
}



reset_text_fields() {
  this.sinhalaText = '';
  this.englishText = '';
}



}

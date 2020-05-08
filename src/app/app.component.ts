import { Component, NgModule } from '@angular/core';
import { SendfileService } from './services/sendfile.service';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ArcheoScriptor | Vimukthi Gunarathna';
  fileToUpload: File = null;
  loader = false;
  language: string
  showTable = false;

  input: any;
  text:any

  showSinhala = false;
  showEnglish = false;

  sinhalaText:any
  englishText:any

  constructor(private imageService: SendfileService) { }


  // processFile(imageInput: any) {
  //   const file: File = imageInput.files[0];
  //   const reader = new FileReader();

  //   reader.addEventListener('load', (event: any) => {

  //     this.selectedFile = new ImageSnippet(event.target.result, file);

  //     this.imageService.uploadImage(this.selectedFile.file).subscribe(
  //       (res) => {

  //       },
  //       (err) => {

  //       })
  //   });

  //   reader.readAsDataURL(file);
  // }

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
      this.english_translation();
      setTimeout(() => {
        this.loader = false;
        this.showEnglish = true
      }, 3000);
    }
  }


  handleFileInput(files: FileList) {
    this.loader = true;
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);

    if (this.fileToUpload.name == '1.jpg') {
      setTimeout(() => {
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
    this.inserToHTML();
  }
  
  
  uploadFileToActivity() {
    // this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
    //   // do something, if upload success
    // }, error => {
    //   console.log(error);
    // });
  }


  wordToDefinition() {
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
      this.showTable = true;
    }, 3000);
  }




  inserToHTML() {
    this.text = 'n;c, .yi';
    // n;c, .yi
  }




  translate_brahmi(){
    console.log(event);
  }
  translate_english(){
    console.log(event);
  }
  translate_sinhala(){
    console.log(event);
  }



  english_translation(){
    this.englishText = 'n;c, .yi';
  }
  sinhala_translation(){
    this.sinhalaText ='n;c, .yi';
  }



  reset_text_fields() {
    this.sinhalaText = '';
    this.englishText = '';
  }



}

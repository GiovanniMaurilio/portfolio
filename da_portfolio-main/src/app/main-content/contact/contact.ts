import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SectionDivider } from '../../shared/section-divider/section-divider';

@Component({
  selector: 'app-contact',
  imports: [TranslateModule, CommonModule, FormsModule, RouterLink, SectionDivider],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {  
  @ViewChild('contentContainer', { static: true }) contentContainerRef!: ElementRef;

  http = inject(HttpClient);

  mailTest = false;

  mailSended = false;
  mailSendFailed = false;

  post = {
    endPoint: 'https://portfolio.giovannimaurilio.at/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  constructor(private translate: TranslateService) {
  }

  markAsTouched(input: any) {
    if (!input.touched) {
      input.control.markAsTouched();
    }
  }

  resetFormView() {
    this.mailSended = false;
    this.mailSendFailed = false;
  }

  onSubmit(form: NgForm) {
    let contactData = {
      "name": form.value.contactName,
      "email": form.value.contactEmail,
      "message": form.value.contactMessage
    }
    
    if (form.submitted && form.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(contactData))
        .subscribe({
          next: (response) => {
            this.mailSended = true;
            form.resetForm();
          },
          error: (error) => {
            this.mailSendFailed = true;
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (form.submitted && form.form.valid && this.mailTest) {
      form.resetForm();
      this.mailSended = true;
      this.mailSendFailed = false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
  addQuestionForm: FormGroup = new FormGroup({});
  options: Array<object> = [];
  submitted = false;
  form: FormGroup = new FormGroup({});
  questions: Array<object> = [];
  defaultOptions = [{ value: '' }, { value: '' }, { value: 'Other' }];
  checkboxArr: any = [];

  constructor(
    public modalService: NgbModal,
    public formBuilder: FormBuilder,
    public service: SharedServiceService,
    public router: Router
  ) {}

  ngOnInit(): void {
    if (!this.service.questionArray) {
      this.addQuestionForm = this.formBuilder.group({
        question_type: ['', [Validators.required]],
        question_name: ['', [Validators.required]],
      });
      this.form = this.formBuilder.group({
        qs: this.formBuilder.array([]),
      });
    } else {
      this.addQuestionForm = this.service.addQuestionForm;
      this.form = this.service.form;
      this.questions = this.service.questionArray;
      this.checkboxArr = this.service.checkboxArr;
    }
    this.addQuestionForm.get('question_type')?.valueChanges.subscribe((val) => {
      if (val == 'check_box') {
        console.log('in');
        this.options = [];
        this.options = [{ value: '' }, { value: '' }, { value: 'Other' }];
      }
    });
  }

  /**
   * @ngdoc method
   * @name qs(form)
   * @description
   * getter method of form control
   */
  get qs() {
    return this.form.controls['qs'] as FormArray;
  }

  /**
   * @ngdoc method
   * @name addq
   * @description
   * add question form control
   */
  addq(question) {
    let qForm;
    if (question.type == 'check_box') {
      qForm = this.formBuilder.group({
        answer: this.formBuilder.array(this.options.map((x) => !1)),
      });
    } else {
      qForm = this.formBuilder.group({
        answer: ['', Validators.required],
      });
    }
    console.log(this.form)
    this.qs.push(qForm);
  }

  /**
   * @ngdoc method
   * @name f(form)
   * @description
   * getter method of form control
   */
  get f() {
    return this.addQuestionForm.controls;
  }

  /**
   * @ngdoc method
   * @name open
   * @description
   * open add question modal
   */
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  /**
   * @ngdoc method
   * @name addOptions
   * @description
   * add option if checklist selected
   */
  addOptions() {
    this.options.push({ value: '' });
  }

  /**
   * @ngdoc method
   * @name submitForm
   * @description
   * will when need to submit add new question
   */
  submitForm(modal) {
    this.submitted = true;
    if (this.addQuestionForm.invalid) {
      return;
    }
    if (
      this.addQuestionForm.value.question_type == 'check_box' &&
      !this.options.length
    ) {
      return;
    }
    const obj = {
      name: this.addQuestionForm.value.question_name,
      type: this.addQuestionForm.value.question_type,
      options: this.options,
    };
    this.questions.push(obj);
    this.addq(obj);
    this.addQuestionForm.reset();
    this.options = [];
    modal.close('Save click');
  }

  /**
   * @ngdoc method
   * @name prepareAnswer
   * @description
   * prepare answers array
   */
  prepareAnswer() {
    const qs = this.form.value.qs;
    qs.forEach((element, index) => {
      if (this.questions[index]['type'] == 'check_box') {
        let checkListAns: any = [];
        element.answer.forEach((checklistChecked, i) => {
          if (checklistChecked) {
            checkListAns.push(this.questions[index]['options'][i]['value']);
          }
        });
        this.questions[index]['final_answer'] = checkListAns;
      } else {
        this.questions[index]['final_answer'] = element.answer;
      }
    });
    console.log(this.questions);
    this.service.questionArray = this.questions;
    this.service.addQuestionForm = this.addQuestionForm;
    this.service.form = this.form;
    this.service.checkboxArr = this.checkboxArr;
    // this.router.navigate(['form/answer']);
  }

  otherCheckTick(i: number) {
    if (this.checkboxArr.includes(i)) {
      this.checkboxArr.splice(
        this.checkboxArr.findIndex((e) => e.index == i),
        1
      );
      console.log(this.checkboxArr);
    } else {
      this.checkboxArr.push({index: i, value: ''});
      console.log(this.checkboxArr);
    }
  }
}

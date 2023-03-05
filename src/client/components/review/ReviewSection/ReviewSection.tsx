import type { FormikErrors } from 'formik';
import { useFormik } from 'formik';
import { type FC, lazy } from 'react';

import type { ReviewFragmentResponse } from '../../../graphql/fragments';

import * as styles from './ReviewSection.styles';

const LESS_THAN_64_LENGTH_REGEX = /^([\s\S\n]{0,8}){0,8}$/u;

type Props = {
  reviews: ReviewFragmentResponse[] | undefined;
  hasSignedIn: boolean;
  onSubmitReview: (reviewForm: ReviewForm) => void;
};

type ReviewForm = {
  comment: string;
};

const PrimaryButton = lazy(() => import('../../foundation/PrimaryButton'));
const TextArea = lazy(() => import('../../foundation/TextArea'));
const ReviewList = lazy(() => import('../ReviewList'));

export const ReviewSection: FC<Props> = ({ hasSignedIn, onSubmitReview, reviews }) => {
  const formik = useFormik<ReviewForm>({
    initialValues: {
      comment: '',
    },
    async onSubmit(value, { resetForm }) {
      onSubmitReview(value);
      resetForm();
    },
    validate(values) {
      const errors: FormikErrors<ReviewForm> = {};
      if (values.comment != '' && !LESS_THAN_64_LENGTH_REGEX.test(values.comment)) {
        errors['comment'] = '64 文字以内でコメントしてください';
      }
      return errors;
    },
    validateOnChange: true,
  });

  return (
    <div>
      {reviews != null ? <ReviewList reviews={reviews} /> : null}
      {hasSignedIn && (
        <form className={styles.form()} data-testid="form-review" onSubmit={formik.handleSubmit}>
          <div className={styles.commentTextAreaWrapper()}>
            <TextArea
              required
              id="comment"
              label="レビューを送信する"
              onChange={formik.handleChange}
              placeholder="こちらの野菜はいかがでしたか？"
              rows={6}
              value={formik.values.comment}
            />
            <p className={styles.error()}>{formik.errors.comment}</p>
          </div>
          <div className={styles.submitButton()}>
            <PrimaryButton size="base" type="submit">
              送信
            </PrimaryButton>
          </div>
        </form>
      )}
    </div>
  );
};

ReviewSection.displayName = 'ReviewSection';

import type { FC } from 'react';
import { lazy } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { useActiveOffer } from '../../hooks/useActiveOffer';
import { useAmountInCart } from '../../hooks/useAmountInCart';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useProduct } from '../../hooks/useProduct';
import { useReviews } from '../../hooks/useReviews';
import { useSendReview } from '../../hooks/useSendReview';
import { useUpdateCartItem } from '../../hooks/useUpdateCartItems';
import { useOpenModal } from '../../store/modal';
import { normalizeCartItemCount } from '../../utils/normalize_cart_item';

import * as styles from './ProductDetail.styles';

const Layout = lazy(() => import('../../components/application/Layout'));
const ProductMediaListPreviewer = lazy(() => import('../../components/product/ProductMediaListPreviewer'));
const ProductOverview = lazy(() => import('../../components/product/ProductOverview'));
const ProductPurchaseSection = lazy(() => import('../../components/product/ProductPurchaseSeciton'));
const ReviewSection = lazy(() => import('../../components/review/ReviewSection'));
const WidthRestriction = lazy(() => import('../../components/foundation/WidthRestriction'));

export const ProductDetail: FC = () => {
  const { productId } = useParams();

  const { product } = useProduct(Number(productId));
  const { reviews } = useReviews(product?.id);
  const { isAuthUser } = useAuthUser();
  const { sendReview } = useSendReview();
  const { updateCartItem } = useUpdateCartItem();
  const handleOpenModal = useOpenModal();
  const { amountInCart } = useAmountInCart(Number(productId));
  const { activeOffer } = useActiveOffer(product?.offers);

  const handleSubmitReview = ({ comment }: { comment: string }) => {
    sendReview({
      variables: {
        comment,
        productId: Number(productId),
      },
    });
  };

  const handleUpdateItem = (productId: number, amount: number) => {
    updateCartItem({
      variables: { amount: normalizeCartItemCount(amount), productId },
    });
  };

  return (
    <>
      {product && (
        <Helmet>
          <title>{product.name}</title>
        </Helmet>
      )}
      <Layout>
        <WidthRestriction>
          <div className={styles.container()}>
            <section className={styles.details()}>
              <ProductMediaListPreviewer product={product} />
              <div className={styles.overview()}>
                <ProductOverview activeOffer={activeOffer} product={product} />
              </div>
              <div className={styles.purchase()}>
                <ProductPurchaseSection
                  amountInCart={amountInCart}
                  isAuthUser={isAuthUser}
                  onOpenSignInModal={() => handleOpenModal('SIGN_IN')}
                  onUpdateCartItem={handleUpdateItem}
                  product={product}
                />
              </div>
            </section>

            <section className={styles.reviews()}>
              <h2 className={styles.reviewsHeading()}>レビュー</h2>
              <ReviewSection hasSignedIn={isAuthUser} onSubmitReview={handleSubmitReview} reviews={reviews} />
            </section>
          </div>
        </WidthRestriction>
      </Layout>
    </>
  );
};

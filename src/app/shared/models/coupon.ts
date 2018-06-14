import { Entity } from '@admin/models/entity';
export class Coupon extends Entity {
  AMTInPercentFLG: string;
  BusinessLevel_CD: string;
  BusinessLevelDisplayName: string;
  CurrencyCD: string;
  DiscountID: number;
  DiscountAMT: number;
  DiscountName: string;
  DiscountType: string;
  DiscountCode: string;
  Descr: string;
  DiscountTypeCD: string;
  DiscountStatusCD: string;
  DiscountTargetCD: string;
  EndDate: string;
  StartDate: string;
  isSelected: boolean = false;
  isParentCoupon: string;
  ManagingCompanyID: number;
  OrderMinAMT: number;
  UserId: number;

  static CreateNew(companyId: number, userId: number): Coupon {
    let newCoupon = new Coupon();
    newCoupon.isSelected = false;
    newCoupon.DiscountID = 0;
    newCoupon.ManagingCompanyID = companyId;
    newCoupon.isParentCoupon = 'Y';
    newCoupon.BusinessLevel_CD = 'COMP';
    newCoupon.BusinessLevelDisplayName = 'Company';
    newCoupon.UserId = userId;
    newCoupon.DiscountName = '';
    newCoupon.DiscountType = '';
    newCoupon.StartDate = new Date().toLocaleDateString();
    newCoupon.EndDate = new Date().toLocaleDateString();
    newCoupon.DiscountCode = '';
    newCoupon.Descr = '';
    newCoupon.DiscountTypeCD = 'LMCP';
    newCoupon.DiscountStatusCD = 'ACTV';
    newCoupon.DiscountTargetCD = 'ORDR';
    newCoupon.AMTInPercentFLG = 'N';
    newCoupon.CurrencyCD = 'USD';
    newCoupon.DiscountAMT = null;
    newCoupon.OrderMinAMT = null;
    return newCoupon;
  }
  isEditable(currentUserId: Number): boolean {
    return true;
  }
  deserialize(coupon: Coupon): Coupon {
    Object.assign(this, coupon);
    return this;
  }
}

export namespace Coupons {
  export enum BusinessLevelDisplayName {
    Personal = 'Personal',
    PersonalShared = 'Personal Shared',
    Company = 'Company',
    Corporate = 'Corporate'
  }

  export enum BusinessLevel_CD {
    Personal = 'SIGN',
    PersonalShared = 'SHAR',
    Company = 'COMP',
    Corporate = 'CORP'
  }
}

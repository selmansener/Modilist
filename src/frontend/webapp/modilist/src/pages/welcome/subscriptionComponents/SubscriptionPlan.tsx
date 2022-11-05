import { Box, Button, FormControl, Grid, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { CustomRadioButtonGroup } from "../../../components/customRadioButton/CustomRadioButton";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";
import { SubscriptionPlan } from "../../../services/swagger/api";

interface SubscriptionPlanFields {
    name: string,
    planType: string,
    description: string,
    img: string,
    type: SubscriptionPlan
}

interface SubscriptionPlanFrameProps {
    currentPlan: SubscriptionPlan;
    onChange: (plan: SubscriptionPlan) => void;
}

export function SubscriptionPlanFrame(props: SubscriptionPlanFrameProps) {
    const { t } = useTranslation();
    const { cdnImg: imgBaseHost } = config;
    const theme = useTheme();
    const { currentPlan, onChange } = props;
    const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>(currentPlan);

    const subscriptionPlanFields: SubscriptionPlanFields[] = [
        {
            name: t("Pages.Welcome.Subscription.SubscriptionPlan.OnDemand.Title"),
            planType: t("Pages.Welcome.Subscription.SubscriptionPlan.PlanType.Flexible"),
            description: t("Pages.Welcome.Subscription.SubscriptionPlan.OnDemand.Description"),
            img: `${imgBaseHost}/common/subscription-plan-1.svg`,
            type: SubscriptionPlan.OnDemand
        },
        {
            name: t("Pages.Welcome.Subscription.SubscriptionPlan.EveryTwoWeeks.Title"),
            planType: t("Pages.Welcome.Subscription.SubscriptionPlan.PlanType.Periodic"),
            description: t("Pages.Welcome.Subscription.SubscriptionPlan.EveryTwoWeeks.Description"),
            img: `${imgBaseHost}/common/subscription-plan-2.svg`,
            type: SubscriptionPlan.InEveryTwoWeeks
        },
        {
            name: t("Pages.Welcome.Subscription.SubscriptionPlan.EveryMonth.Title"),
            planType: t("Pages.Welcome.Subscription.SubscriptionPlan.PlanType.Periodic"),
            description: t("Pages.Welcome.Subscription.SubscriptionPlan.EveryMonth.Description"),
            img: `${imgBaseHost}/common/subscription-plan-3.svg`,
            type: SubscriptionPlan.InEveryMonth
        },
        {
            name: t("Pages.Welcome.Subscription.SubscriptionPlan.EveryTwoMonths.Title"),
            planType: t("Pages.Welcome.Subscription.SubscriptionPlan.PlanType.Periodic"),
            description: t("Pages.Welcome.Subscription.SubscriptionPlan.EveryTwoMonths.Description"),
            img: `${imgBaseHost}/common/subscription-plan-4.svg`,
            type: SubscriptionPlan.InEveryTwoMonths
        },
        {
            name: t("Pages.Welcome.Subscription.SubscriptionPlan.EveryThreeMonths.Title"),
            planType: t("Pages.Welcome.Subscription.SubscriptionPlan.PlanType.Periodic"),
            description: t("Pages.Welcome.Subscription.SubscriptionPlan.EveryThreeMonths.Description"),
            img: `${imgBaseHost}/common/subscription-plan-5.svg`,
            type: SubscriptionPlan.InEveryThreeMonth
        }
    ]

    const content = subscriptionPlanFields.map(plan => {
        return {
            value: plan.type,
            element: <Box sx={{
                borderRadius: 4,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1
            }}>
                <Box>
                    <Typography variant="h4" mb={2}>{plan.name}</Typography>
                    <Typography mb={2}><Trans>{plan.planType}</Trans></Typography>
                    <Typography mb={2}><Trans>{plan.description}</Trans></Typography>
                    {plan.type === SubscriptionPlan.InEveryMonth &&
                        <Box sx={{
                            p: 2,
                            mb: 4,
                            backgroundColor: theme.palette.success.main,
                            borderRadius: 4,
                        }}>
                            <Typography variant="body1">
                                {t("Pages.Welcome.Subscription.SubscriptionPlan.Suggested")}
                            </Typography>
                        </Box>}
                </Box>
                <ImageComponent width="100%" src={plan.img} />
            </Box>,
            label: (selected: boolean) => {
                if (selected) {
                    return (<Button variant="contained">
                        {t("Pages.Welcome.Subscription.SubscriptionPlan.Button.Selected")}
                    </Button>)
                }
                else {
                    return (<Button variant="outlined">
                        {t("Pages.Welcome.Subscription.SubscriptionPlan.Button.Select")}
                    </Button>)
                }
            }
        }
    })

    const RenderSubscriptionPlanFrame = (content: {
        value: string;
        element: string | JSX.Element;
    }[]) => {
        return (
            <Grid item md={12}>
                <Box sx={{
                    borderRadius: 4
                }}>
                    <FormControl fullWidth>
                        <CustomRadioButtonGroup
                            containerSx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                alignItems: 'stretch'
                            }}
                            radioButtonSx={{
                                flexBasis: '20%',
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                            name="subscriptionPlan"
                            value={subscriptionPlan}
                            contents={content}
                            onChange={(value) => {
                                setSubscriptionPlan(value as SubscriptionPlan);
                                onChange(value as SubscriptionPlan);
                            }}
                        />
                    </FormControl>
                </Box>
            </Grid>
        )
    }

    return (
        <Grid item container spacing={4}>
            <Grid item xs={12}>
                <Box sx={{
                    p: 2,
                    bgcolor: theme.palette.secondary.transparent,
                    borderRadius: 2,
                    borderColor: theme.palette.primary.main,
                    borderStyle: 'solid'
                }}>
                    <Grid item md={12} textAlign="center">
                        <Typography display="block" variant="h3">{t('Pages.Welcome.Subscription.SubscriptionPlan.Title')}</Typography>
                        <Typography mt={2} display="block" variant="subtitle1">{t('Pages.Welcome.Subscription.SubscriptionPlan.Description')}</Typography>
                    </Grid>
                    {RenderSubscriptionPlanFrame(content)}
                </Box>
            </Grid>
        </Grid>
    )
}
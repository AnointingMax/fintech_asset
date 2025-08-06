import { api } from '@/axios';
import { CustomInput } from '@/components';
import { Button } from '@/components/ui/button';
import { usePortalContext } from '@/hooks/PortalContext';
import { showSuccessToast } from '@/lib/toast';
import type { ApiResponse } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik } from 'formik'
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
   amount: Yup.number()
      .positive("Amount must be greater than zero")
      .required("Amount is required")
});

const investFn = (data: { amount: number }): Promise<ApiResponse> => api.post("/transactions/invest", data)

const Invest = () => {
   const queryClient = useQueryClient();
   const { closePortal } = usePortalContext()

   const initialValues = {
      amount: 0
   };

   const { mutate, isPending } = useMutation({
      mutationFn: investFn,
      onSuccess: async ({ message }) => {
         showSuccessToast(message)
         await queryClient.invalidateQueries({
            queryKey: ["user"]
         })
         closePortal()
      }
   })

   return (
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={values => mutate(values)}>
         {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="grid gap-5">
               <CustomInput
                  label="Amount to invest"
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  inputMode='numeric'
                  value={values.amount}
                  onChange={handleChange}
               />
               <Button disabled={isPending}>Invest</Button>
            </form>
         )}
      </Formik>
   )
}

export default Invest
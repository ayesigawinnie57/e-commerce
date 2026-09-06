from rest_framework.pagination import PageNumberPagination


class StandardResultsPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 100

    def get_page_size(self, request):
        # Accept camelCase pageSize from frontend as well
        if "pageSize" in request.query_params:
            try:
                return min(int(request.query_params["pageSize"]), self.max_page_size)
            except (ValueError, TypeError):
                pass
        return super().get_page_size(request)

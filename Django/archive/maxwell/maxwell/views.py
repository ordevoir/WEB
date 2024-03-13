from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login

# автоматическое перенаправление по /labor
# def redirect_labor(request):
#     return redirect('index', permanent=True)

# class Guest(TemplateView):
#     template = 'registration/guest.html'

#     def get(self, request):
#         if request.user.is_authenticated:
#             return redirect('index', permanent=True)
#         else:
#             return render(request, self.template)